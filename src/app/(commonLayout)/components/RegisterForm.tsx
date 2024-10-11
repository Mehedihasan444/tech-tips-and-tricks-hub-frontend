"use client";
import React, { useEffect, useState } from "react";
import GoogleLoginBtn from "./shared/GoogleLoginBtn";
import FormDivider from "./shared/FormDivider";
import SubmitBtn from "./SubmitBtn";
import { Input } from "@nextui-org/react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useUserRegistration } from "@/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { generateNickname } from "@/utils/generateNickname";

const profilePhoto =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUserRegistration();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } else if (isError) {
      setErrors(error?.message || "Registration failed. Please try again.");
    }
  }, [isPending, isSuccess, isError, error, redirect, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    if (!name || !email || !password || !confirmPassword) {
      setErrors("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }
    const nickName = await generateNickname(name)
    handleUserRegistration({ name, email, password, profilePhoto, nickName });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-3 max-w-md border p-4 rounded-md border-primary"
      >
        <h1 className="text-3xl font-semibold text-center">Register</h1>

        {/* Name input */}
        <Input
          label="Name"
          variant="bordered"
          isRequired
          className="max-w-lg"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email input */}
        <Input
          label="Email"
          variant="bordered"
          isRequired
          className="max-w-lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <Input
          label="Password"
          variant="bordered"
          isRequired
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="max-w-lg"
        />

        {/* Confirm Password input */}
        <Input
          label="Confirm Password"
          variant="bordered"
          isRequired
          placeholder="Confirm your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="max-w-lg"
        />

        {/* Error message */}
        {errors && <p className="text-red-500 text-center text-sm">{errors}</p>}

        {/* Submit button */}
        <SubmitBtn text="Register" isLoading={isPending} />

        {/* Divider */}
        <FormDivider />

        {/* Google Login Button */}
        <GoogleLoginBtn />

        {/* Already registered */}
        <div className="text-center">
          <p className="text-sm">
            Already registered?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;

// "use client";
// import React, { useEffect, useState } from "react";
// import GoogleLoginBtn from "./shared/GoogleLoginBtn";
// import FormDivider from "./shared/FormDivider";
// import SubmitBtn from "./SubmitBtn";
// import { Input } from "@nextui-org/react";
// import { EyeIcon, EyeOff } from "lucide-react";
// import { useUserRegistration } from "@/hooks/auth.hook";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// const profilePhoto =
//   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

// const RegisterForm = () => {
//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   const [errors, setErrors] = useState<string | null>(null);
//   const {
//     mutate: handleUserRegistration,
//     isPending,
//     isSuccess,
//     isError,
//     error,
//   } = useUserRegistration();
//   useEffect(() => {
//     if (!isPending && isSuccess) {
//       if (redirect) {
//         router.push(redirect);
//       } else {
//         router.push("/");
//       }
//     } else if (isError) {
//       setErrors(error?.message || "Login failed. Please try again.");
//     }
//   }, [isPending, isSuccess, isError, error, redirect, router]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setErrors(null);

//     if (!email || !password) {
//       setErrors("Both email and password are required.");
//       return;
//     }
//     handleUserRegistration({ name, email, password, profilePhoto });
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full space-y-6 max-w-md border p-4 rounded-md border-primary"
//       >
//         <h1 className="text-3xl font-semibold text-center">Register</h1>

//         {/* Name input */}
//         <Input
//           label="Name"
//           variant="bordered"
//           isRequired
//           className="max-w-lg"
//           placeholder="Enter your name"
//           value={email}
//           onChange={(e) => setName(e.target.value)}
//         />

//         {/* Email input */}
//         <Input
//           label="Email"
//           variant="bordered"
//           isRequired
//           className="max-w-lg"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password input */}
//         <Input
//           label="Password"
//           variant="bordered"
//           isRequired
//           placeholder="Enter your password"
//           endContent={
//             <button
//               className="focus:outline-none"
//               type="button"
//               onClick={toggleVisibility}
//               aria-label="toggle password visibility"
//             >
//               {isVisible ? (
//                 <EyeOff className="text-2xl text-default-400 pointer-events-none" />
//               ) : (
//                 <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
//               )}
//             </button>
//           }
//           type={isVisible ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="max-w-lg"
//         />

//         {/* Confirm Password input */}
//         <Input
//           label="Confirm Password"
//           variant="bordered"
//           isRequired
//           placeholder="Enter your password"
//           endContent={
//             <button
//               className="focus:outline-none"
//               type="button"
//               onClick={toggleVisibility}
//               aria-label="toggle password visibility"
//             >
//               {isVisible ? (
//                 <EyeOff className="text-2xl text-default-400 pointer-events-none" />
//               ) : (
//                 <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
//               )}
//             </button>
//           }
//           type={isVisible ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="max-w-lg"
//         />
//         {/* Submit button */}
//         <SubmitBtn text="Register" isLoading={false} />

//         {/* Divider */}
//         <FormDivider />
//         {/* Google Login Button */}
//         <GoogleLoginBtn />

//         {/* Already registered */}
//         <div className="text-center">
//           <p className="text-sm">
//             Already registered?{" "}
//             <Link href="/login" className="text-primary hover:underline">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </form>
//     </>
//   );
// };

// export default RegisterForm;
