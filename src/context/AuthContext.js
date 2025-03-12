"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedRole = Cookies.get("role");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const login = (token, role) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("role", role, { expires: 7 });
    setToken(token);
    setRole(role);
    router.push("/dashboard"); 
  };

  const logoutSession = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setToken(null);
    setRole(null);
    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logoutSession }}>
      {children}
    </AuthContext.Provider>
  );
};
