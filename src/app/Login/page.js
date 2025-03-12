"use client"
import Image from "next/image";
import loginimg from "../../../public/login-image.jpg"
import LoginForm from "@/components/LoginForm";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
  return (
    <div className="h-screen flex">
      
      <div className="w-2/3 hidden md:block relative">
        <Image
          src={loginimg} 
          alt="Beach"
          layout="fill"
          objectFit="cover"
        />
      </div>

     
      <div className="w-full md:w-1/3 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
