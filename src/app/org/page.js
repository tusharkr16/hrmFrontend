"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/network/axiosInstance";
import EmployeeTable from "@/components/EmployeeTable";

const HRLeaveManagement = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/api/leave/all");
            setLeaveRequests(response.data);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to fetch leave requests" });
        } finally {
            setLoading(false);
        }
    };

    const updateLeaveStatus = async (leaveId, status) => {
        try {
            await axiosInstance.put("/api/leave/update", { leaveId, status });

            setMessage({ type: "success", text: `Leave request ${status}` });
            setLeaveRequests(prevRequests =>
                prevRequests.map(leave =>
                    leave._id === leaveId ? { ...leave, status } : leave
                )
            );
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update leave status" });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {message && (
                <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message.text}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Employee Leave Requests</h2>

            {loading ? (
                <p className="text-gray-500">Loading leave requests...</p>
            ) : leaveRequests.length === 0 ? (
                <p className="text-gray-500">No leave requests found.</p>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow bg-white">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border p-2">Employee Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Start Date</th>
                                <th className="border p-2">End Date</th>
                                <th className="border p-2">Reason</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
    {leaveRequests.map((leave) => (
        <tr key={leave._id} className="text-center">
            <td className="border p-2">{leave.employeeId?.name || "N/A"}</td>
            <td className="border p-2">{leave.employeeId?.email || "N/A"}</td>
            <td className="border p-2">{new Date(leave.startDate).toLocaleDateString()}</td>
            <td className="border p-2">{new Date(leave.endDate).toLocaleDateString()}</td>
            <td className="border p-2">{leave.reason}</td>
            <td className={`border p-2 font-semibold ${leave.status === "Pending" ? "text-orange-500" : leave.status === "Approved" ? "text-green-500" : "text-red-500"}`}>
                {leave.status}
            </td>
            <td className="border p-2 flex gap-2 justify-center">
                {leave.status === "Pending" && (
                    <>
                        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => updateLeaveStatus(leave._id, "Approved")}>
                            Approve
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => updateLeaveStatus(leave._id, "Rejected")}>
                            Reject
                        </button>
                    </>
                )}
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
            )}
            <EmployeeTable/>
        </div>
    );
};

export default HRLeaveManagement;
