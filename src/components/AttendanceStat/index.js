"use client";
import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const AttendanceCard = () => {
  const [selectedRange, setSelectedRange] = useState("Last Week");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border">
      
      <div className="flex justify-between items-center">
        <button className="flex items-center gap-1 text-gray-600 text-sm">
          {selectedRange} <ChevronDown className="w-4 h-4" />
        </button>
        <Info className="w-4 h-4 text-gray-400" />
      </div>

      
      <div className="mt-4">
       
        <div className="flex items-center gap-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 text-white flex items-center justify-center rounded-full">
              👤
            </div>
            <span className="text-gray-800 font-medium">Me</span>
          </div>
          <div className="ml-auto flex gap-8 text-right text-gray-800">
            <div>
              <div className="text-xs text-gray-500">AVG HRS / DAY</div>
              <div className="text-lg font-semibold">0h</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">ON TIME ARRIVAL</div>
              <div className="text-lg font-semibold">0%</div>
            </div>
          </div>
        </div>

        
        <div className="flex items-center gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              👥
            </div>
            <span className="text-gray-800 font-medium">My Team</span>
          </div>
          <div className="ml-auto flex gap-8 text-right text-gray-800">
            <div>
              <div className="text-xs text-gray-500">AVG HRS / DAY</div>
              <div className="text-lg font-semibold">5h 40m</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">ON TIME ARRIVAL</div>
              <div className="text-lg font-semibold">14%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
