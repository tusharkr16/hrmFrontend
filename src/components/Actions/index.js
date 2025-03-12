import React from "react";

const AttendanceTable = ({ attendance }) => {
 
  const calculateHours = (checkIn, checkOut) => {
    if (!checkOut) return "Ongoing";

    const diffMs = new Date(checkOut) - new Date(checkIn);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Last 30 Days</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Effective Hours</th>
            <th className="p-2 border">Gross Hours</th>
            <th className="p-2 border">Arrival</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id} className="text-center">
              <td className="p-2 border">{new Date(record.checkInTime).toDateString()}</td>
              <td className="p-2 border">{calculateHours(record.checkInTime, record.checkOutTime)}</td>
              <td className="p-2 border">{calculateHours(record.checkInTime, record.checkOutTime)}</td>
              <td className="p-2 border">{record.checkOutTime ? "On Time" : "Still Checked In"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
