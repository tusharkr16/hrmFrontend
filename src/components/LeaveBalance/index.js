'use client';

import { useState, useEffect } from 'react';

const LeaveBalance = () => {
  
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
   
    setTimeout(() => {
      setLeaveData([
        {
          type: 'Casual Leave',
          available: 0.5,
          consumed: 2.5,
          accrued: 3,
          quota: 4,
          color: 'purple',
        },
        {
          type: 'Earned Leave',
          available: 7.5,
          consumed: 0,
          accrued: 7.5,
          quota: 10,
          color: 'red',
        },
        {
          type: 'Sick Leave',
          available: 0.5,
          consumed: 2.5,
          accrued: 3,
          quota: 4,
          color: 'green',
        },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Leave Balances</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveData.map((leave, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">{leave.type}</h3>
            <div className="flex justify-center items-center my-4">
              <div
                className={`w-24 h-24 flex items-center justify-center rounded-full p-6 border-4 border-${leave.color}-500 text-${leave.color}-600 font-bold`}
              >
                {leave.available} Days Available
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
              <div>
                <p className="font-semibold">Available</p>
                <p>{leave.available} day(s)</p>
              </div>
              <div>
                <p className="font-semibold">Consumed</p>
                <p>{leave.consumed} day(s)</p>
              </div>
              <div>
                <p className="font-semibold">Accrued So Far</p>
                <p>{leave.accrued} day(s)</p>
              </div>
              <div>
                <p className="font-semibold">Annual Quota</p>
                <p>{leave.quota} day(s)</p>
              </div>
            </div>
            <p className="text-right mt-4 text-orange-500 cursor-pointer">View details</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
