"use client";
import React from "react";
import { Coffee } from "lucide-react";
const Timings = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const todayIndex = new Date().getDay(); 

  const data = {
    todayStart: "9:30 AM",
    todayEnd: "6:00 PM",
    duration: "8h 30m",
    breakTime: "30 min",
    days: days.map((label, index) => ({
      label,
      isActive: index === (todayIndex === 0 ? 6 : todayIndex - 1), 
    })),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Timings</h2>

      {/* Days of the Week */}
      <div className="flex gap-2 mb-4">
        {data.days.map((day, index) => (
          <span
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
              day.isActive ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {day.label}
          </span>
        ))}
      </div>

      {/* Today's Timing */}
      <p className="text-gray-700 mb-2">
        Today <span className="font-semibold">({data.todayStart} - {data.todayEnd})</span>
      </p>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden my-2">
        {/* Active Work Hours */}
        <div className="absolute top-0 left-0 h-full bg-blue-400" style={{ width: "80%" }}></div>
        {/* Break Indicator */}
        <div className="absolute top-0 left-[45%] h-full w-6 bg-gray-300"></div>
      </div>

      {/* Duration & Break */}
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>Duration: {data.duration}</span>
        <span className="flex items-center">
        <Coffee className="w-4 h-4 mr-1 text-gray-600" /> {data.breakTime}
        </span>
      </div>
    </div>
  );
};

export default Timings;
