"use client"
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
const navbarRoutes = [ "/","/Login"];



export default function SidebarWrapper({ children }) {
    const pathname = usePathname();
  const [isNavbarPage, setIsNavbarPage] = useState(false);

  useEffect(() => {
    setIsNavbarPage(navbarRoutes.includes(pathname));
  }, [pathname]);

  if (isNavbarPage === undefined) return null;

  return isNavbarPage ? (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </>
  ) : (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}
