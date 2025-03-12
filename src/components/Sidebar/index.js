"use client";
import { AuthContext } from "@/context/AuthContext";
import { Home, User, Mail, Users, DollarSign, Building, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const Sidebar = () => {
    const { role, logoutSession } = useContext(AuthContext);
    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
            <h3 className="text-2xl py-1">K and A Portal</h3>
            <h5 className="py-2">Welcome Back {role}</h5>

            {/* Attendance */}
            <Link href="/dashboard" className="flex items-center gap-3 py-5 px-4 hover:bg-gray-700 rounded cursor-pointer">
                <User className="w-5 h-5" />
                <span>Attendance</span>
            </Link>




            <Link href="/leave" className="flex items-center gap-3 py-5 px-4 hover:bg-gray-700 rounded cursor-pointer">
                <Building className="w-5 h-5" />
                <span>Leave</span>
            </Link>


            <Link href="/inbox" className="flex items-center gap-3 py-5 px-4 hover:bg-gray-700 rounded cursor-pointer">
                <Mail className="w-5 h-5" />
                <span>Inbox</span>
            </Link>


            {role === "HR" && (
                <>

                    <Link href="/payroll" className="flex items-center gap-3 py-5 px-4 hover:bg-gray-700 rounded cursor-pointer">
                        <User className="w-5 h-5" />
                        <span>Payroll</span>
                    </Link>

                    <Link href="/register" className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded cursor-pointer">
                        <DollarSign className="w-5 h-5" />
                        <span>Create Employee</span>
                    </Link>

                    <Link href="/org" className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded cursor-pointer">
                        <Users className="w-5 h-5" />
                        <span>Employee Management</span>
                    </Link>
                </>
            )}
            <button onClick={logoutSession} className="flex items-center gap-3 py-5 px-4 hover:bg-red-600 rounded cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
