import React from "react";
import { Coffee } from "lucide-react";

const Timings = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const todayIndex = new Date().getDay() - 1; 

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-96">
      <h2 className="text-lg font-semibold mb-2">Timings</h2>
      <div className="flex space-x-2 mb-3">
        {days.map((day, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
              index === todayIndex ? "bg-blue-500 text-white" : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-700">
        Today <span className="font-medium">(9:30 AM - 6:00 PM)</span>
      </p>

   
      <div className="relative mt-2 h-2 w-full bg-gray-300 rounded-full">
        <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
        <div className="absolute h-full bg-gray-200 rounded-full" style={{ width: "10%", left: "40%" }}></div>
      </div>

      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>Duration: <strong>8h 30m</strong></span>
        <div className="flex items-center space-x-1">
          <Coffee size={16} />
          <span>30 min</span>
        </div>
      </div>
    </div>
  );
};

export default Timings;
