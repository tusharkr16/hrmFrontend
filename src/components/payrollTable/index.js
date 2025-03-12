"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/network/axiosInstance";

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axiosInstance.get("/api/payroll/all");
        setPayrolls(response.data);
      } catch (err) {
        setError(err.message || "Failed to load payroll data");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);

  if (loading) return <p className="text-center">Loading payroll data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Base Salary</th>
              <th className="px-4 py-2 text-left">Present Days</th>
              <th className="px-4 py-2 text-left">Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{payroll.employeeId.name}</td>
                <td className="px-4 py-2">{payroll.employeeId.email}</td>
                <td className="px-4 py-2">{payroll.month}</td>
                <td className="px-4 py-2">{payroll.year}</td>
                <td className="px-4 py-2">₹{payroll.baseSalary.toLocaleString()}</td>
                <td className="px-4 py-2">{payroll.presentDays}</td>
                <td className="px-4 py-2 font-semibold">₹{payroll.salary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollTable;
