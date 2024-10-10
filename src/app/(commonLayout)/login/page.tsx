import React from "react";
import Image from "next/image";
import photo from "@/assets/authenticationIMG.svg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {

  return (
    <div className="h-screen sm:flex justify-between items-center max-w-5xl mx-auto">
      {/* Left side - Image */}
      <div className="w-full flex-1 h-full relative hidden sm:flex">
        <Image src={photo} alt="Login illustration" layout="fill" priority />
      </div>

      {/* Right side - Login form */}
      <div className="w-full h-full flex-1 p-8 flex justify-center items-center">
       <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;
