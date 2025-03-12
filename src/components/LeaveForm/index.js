"use client";

import { axiosInstance } from "@/network/axiosInstance";
import { getStatusColor } from "@/utils/util";
import { useState, useEffect } from "react";

const RequestLeave = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [note, setNote] = useState("");
    const [notifyHR, setNotifyHR] = useState("");
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [error, setError] = useState({ startDate: false, leaveType: false, note: false });
    const [message, setMessage] = useState(null);

    const fetchLeaveRequests = async () => {
        try {
            const response = await axiosInstance.get("/api/leave/my-leaves");
            setLeaveRequests(response.data);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to fetch leave requests" });
        }
    };


    useEffect(() => {


        fetchLeaveRequests();
    }, []);

    const handleSubmit = async () => {
        if (!startDate || !leaveType || !note) {
            setError({ startDate: !startDate, leaveType: !leaveType, note: !note });
            return;
        }

        const leaveRequestData = {
            startDate,
            endDate,
            reason: note,
        };

        try {
            const response = await axiosInstance.post("/api/leave/apply", leaveRequestData);
            setMessage({ type: "success", text: response.data.message });

            // Add to local list for UI update
            const newRequest = {
                startDate,
                endDate,
                daysCount: calculateDays(),
                leaveType,
                requestDate: new Date().toLocaleDateString(),
                status: "Pending",
                note,
            };

            setLeaveRequests([...leaveRequests, newRequest]);
            setIsOpen(false);
            setStartDate("");
            setEndDate("");
            setLeaveType("");
            setNote("");
            setNotifyHR("");
            fetchLeaveRequests();
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to apply for leave" });
        }
    };

    const calculateDays = () => {
        if (!startDate || !endDate) return null;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays > 0 ? diffDays : null;
    };

    return (
        <div className="max-w-lg p-6">
            {message && (
                <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message.text}
                </div>
            )}

            {!isOpen && (
                <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-orange-500 text-white rounded">
                    Request Leave
                </button>
            )}

            {isOpen && (
                <div className="p-6 border rounded-lg shadow-md bg-white mt-4">
                    <h2 className="text-2xl font-semibold mb-4">Request Leave</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Start Date</label>
                        <input type="date" className={`w-full border p-2 rounded ${error.startDate ? "border-red-500" : ""}`} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">End Date</label>
                        <input type="date" className="w-full border p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    {calculateDays() && <p className="text-blue-600 font-medium mb-2">For {calculateDays()} days</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Leave Type</label>
                        <select className="w-full border p-2 rounded" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Note</label>
                        <textarea className="w-full border p-2 rounded" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={handleSubmit}>Request</button>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Past Leave Requests</h3>
                {leaveRequests.length === 0 ? (
                    <p className="text-gray-500">No past leave requests.</p>
                ) : (
                    <div className="border p-4 rounded-lg bg-white shadow">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Start Date</th>
                                    <th className="border p-2">End Date</th>
                                    <th className="border p-2">Days</th>
                                    <th className="border p-2">Reason</th>
                                    <th className="border p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.map((leave, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border p-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                                        <td className="border p-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                                        <td className="border p-2">{Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1}</td>
                                        <td className="border p-2">{leave.reason}</td>
                                        <td className={`p-2 border font-semibold ${getStatusColor(leave.status)}`}>
                                            {leave.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestLeave;
