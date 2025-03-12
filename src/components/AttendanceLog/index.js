"use client";

import { axiosInstance } from "@/network/axiosInstance";
import React, { useEffect, useState } from "react";

const AttendanceTracker = ({ addNewAttendance }) => {
  const [time, setTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

 
  useEffect(() => {
    setTime(new Date());

    const storedCheckIn = localStorage.getItem("checkInTime");
    if (storedCheckIn) {
      setIsCheckedIn(true);
      setCheckInTime(new Date(storedCheckIn));
    }
  }, []);

  // Run clock every second
  useEffect(() => {
    if (time) {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  const formatTime = (date) =>
    date ? date.toLocaleTimeString("en-US", { hour12: true }) : "Loading...";

  // Calculate time since check-in
  const calculateTimeSinceCheckIn = () => {
    if (!checkInTime) return "0s";
    const diffMs = new Date().getTime() - checkInTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Handle Clock In
  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const response = await axiosInstance.post("/api/check-in", {
        checkInTime: now.toISOString(),
      });

      if (response.status === 201) {
        setIsCheckedIn(true);
        setCheckInTime(now);
        localStorage.setItem("checkInTime", now.toISOString());

        addNewAttendance({
          _id: Date.now(),
          checkInTime: now.toISOString(),
          checkOutTime: null,
        });
      } else {
        alert("Failed to check in.");
      }
    } catch (error) {
      console.error("Check-in error:", error);
    }
  };

  // Handle Clock Out
  const handleCheckOut = async () => {
    try {
      const now = new Date().toISOString();
      const response = await axiosInstance.post("/api/check-out", { checkOutTime: now });

      if (response.status === 200) {
        setIsCheckedIn(false);
        setCheckInTime(null);
        localStorage.removeItem("checkInTime");
        alert("Checked out successfully!");
      } else {
        alert("Failed to check out.");
      }
    } catch (error) {
      console.error("Check-out error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="font-medium">Mark Today&apos;s Attendance</h3>

      <div className="p-4 mt-5 border rounded-md shadow-md text-xl font-semibold text-gray-800 w-fit">
        {formatTime(time)}
      </div>

      {!isCheckedIn ? (
        <button
          onClick={handleCheckIn}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
        >
          Clock In
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleCheckOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 cursor-pointer"
          >
            Clock Out
          </button>
          <div className="text-sm text-gray-600">
            {calculateTimeSinceCheckIn()} since check-in
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;
