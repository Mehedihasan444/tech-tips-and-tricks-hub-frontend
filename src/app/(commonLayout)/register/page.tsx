import React from "react";
import Image from "next/image";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import photo from "@/assets/authenticationIMG.svg";
import { Divider } from "@nextui-org/divider";
import GoogleLoginBtn from "../components/shared/GoogleLoginBtn";

const RegisterPage = () => {
  return (
    <div className="h-screen sm:flex justify-between items-center max-w-5xl mx-auto">
      {/* Left side - Image */}
      <div className="w-full flex-1 h-full relative hidden sm:flex">
        <Image src={photo} alt="Register illustration" layout="fill" priority />
      </div>

      {/* Right side - Registration form */}
      <div className="w-full h-full flex-1 p-8 flex justify-center items-center">
        <form className="w-full space-y-6 max-w-md">
          <h1 className="text-3xl font-semibold text-center">Register</h1>

          {/* Name input */}
          <FormInput type="text" label="Name" />

          {/* Email input */}
          <FormInput type="email" label="Email" />

          {/* Password input */}
          <FormInput type="password" label="Password" />

          {/* Confirm Password input */}
          <FormInput type="password" label="Confirm Password" />

          {/* Submit button */}
          <SubmitBtn text="Register"/>

          {/* Divider */}
          <Divider className="my-4 bg-primary/50" />

          {/* Google Login Button */}
          <GoogleLoginBtn />

          {/* Already registered */}
          <div className="text-center">
            <p className="text-sm">
              Already registered?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
