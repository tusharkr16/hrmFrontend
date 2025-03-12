"use client"
import { useState } from "react";

const LeaveRequest = () => {
  const [leaveData, setLeaveData] = useState(null);

  const demoData = {
    startDate: "2025-03-03",
    endDate: "2025-03-06",
    daysCount: 4,
    leaveType: "Unpaid Leave",
    requestDate: "2025-03-03",
    status: "Partially Approved",
  };

  const handleSubmit = () => {
    // Simulate API response
    setLeaveData(demoData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <button
        onClick={handleSubmit}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Leave Status
      </button>
      {leaveData && (
        <div className="bg-white shadow-md p-6 rounded-md w-full max-w-3xl">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="text-sm text-gray-500">PAST LEAVE</p>
              <p className="text-lg font-semibold">
                {leaveData.startDate} - {leaveData.endDate} ({leaveData.daysCount} days)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">LEAVE TYPE</p>
              <p className="font-medium">{leaveData.leaveType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">REQUESTED ON</p>
              <p className="font-medium">{leaveData.requestDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">STATUS</p>
              <p className="font-medium text-orange-500">{leaveData.status}</p>
              <a href="#" className="text-sm text-blue-600">View Approvers</a>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Leave Note: {leaveData.daysCount} days leave</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
