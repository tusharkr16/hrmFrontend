"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/network/axiosInstance";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get("/api/auth/all-employees");
            setEmployees(response.data);
        } catch (err) {
            setError("Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (employee) => {
        setEditMode(employee._id);
        setUpdatedData({ name: employee.name, email: employee.email, role: employee.role });
    };

    const handleUpdate = async (id) => {
        try {
            await axiosInstance.put(`/api/auth/update-employee/${id}`, updatedData);
            fetchEmployees();
            setEditMode(null);
        } catch (err) {
            console.error("Error updating employee", err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            try {
                await axiosInstance.delete(`/api/auth/delete-employee/${id}`);
                fetchEmployees();
            } catch (err) {
                console.error("Error deleting employee", err);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Employee Management</h2>

            {loading && <p>Loading employees...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && employees.length === 0 && <p>No employees found.</p>}

            {!loading && !error && employees.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee._id} className="text-center">
                                    {editMode === employee._id ? (
                                        <>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={updatedData.name}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, name: e.target.value })
                                                    }
                                                    className="border p-1"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="email"
                                                    value={updatedData.email}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, email: e.target.value })
                                                    }
                                                    className="border p-1"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={updatedData.role}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, role: e.target.value })
                                                    }
                                                    className="border p-1"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <button onClick={() => handleUpdate(employee._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                                                    Save
                                                </button>
                                                <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white px-3 py-1 rounded">
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-2">{employee.name}</td>
                                            <td className="border p-2">{employee.email}</td>
                                            <td className="border p-2">{employee.role}</td>
                                            <td className="border p-2">
                                                <button onClick={() => handleEdit(employee)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;
