"use client";


import { useEffect, useState } from "react";
import { axiosInstance } from "@/network/axiosInstance";
import AttendanceCard from "@/components/AttendanceStat";
import AttendanceTracker from "@/components/AttendanceLog";
import Timings from "@/components/Timings";
import AttendanceTable from "@/components/Actions";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axiosInstance.get("/api/attendance");
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

 
  const addNewAttendance = (newRecord) => {
    setAttendance((prevAttendance) => [newRecord, ...prevAttendance]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white shadow-lg p-4 rounded-lg">
          <AttendanceCard />
        </div>
        <div className="col-span-1 bg-white shadow-lg border p-4 rounded-lg">
          <AttendanceTracker addNewAttendance={addNewAttendance} />
        </div>
        <div className="col-span-1 bg-white shadow-lg p-4 rounded-lg">
          <Timings />
        </div>
      </div>
      <div className="mt-6 bg-white shadow-lg p-4 rounded-lg">
        <AttendanceTable attendance={attendance} />
      </div>
    </div>
  );
};

export default Attendance;
