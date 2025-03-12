"use client"; 

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <div className="text-2xl font-bold text-gray-800">K and A</div>

      
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

      
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

     
      <div
        className={`md:hidden flex flex-col items-center space-y-4 py-4 bg-white transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavLinks />
      </div>
    </nav>
  );
};


const NavLinks = () => (
  <>
    <Link href="/" className="text-gray-600  hover:text-blue-600 mt-2">Home</Link>
 
    <Link href="/Login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
      Login
    </Link>
  </>
);

export default Navbar;
