"use client";
import { useState } from "react";
import { axiosInstance } from "@/network/axiosInstance";

const PayrollForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    baseSalary: "",
    month: "",
    year: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("api/payroll/generate", formData);
      alert("Payroll generated successfully!");
      setIsModalOpen(false); 
    } catch (error) {
      alert("Error generating payroll: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex flex-col items-start py-5 bg-gray-100">
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Generate Payroll
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
          
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Generate Payroll</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
             
              <div>
                <label className="block text-gray-600 font-medium">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

            
              <div>
                <label className="block text-gray-600 font-medium">Base Salary</label>
                <input
                  type="number"
                  name="baseSalary"
                  placeholder="Enter Base Salary"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Month (1-12)</label>
                <input
                  type="number"
                  name="month"
                  placeholder="Enter Month"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  required
                  min="1"
                  max="12"
                />
              </div>

             
              <div>
                <label className="block text-gray-600 font-medium">Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="Enter Year"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                Generate Payroll
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollForm;
