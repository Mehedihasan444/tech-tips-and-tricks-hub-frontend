"use client";
import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import SubmitBtn from "./SubmitBtn";
import GoogleLoginBtn from "./shared/GoogleLoginBtn";
import FormDivider from "./shared/FormDivider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUserLogin();

  useEffect(() => {
    userLoading(isPending);
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } else if (isError) {
      setErrors(error?.message || "Login failed. Please try again.");
    }
  }, [isPending, isSuccess, isError, error, redirect, router, userLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    if (!email || !password) {
      setErrors("Both email and password are required.");
      return;
    }
    const res = handleUserLogin({ email, password });
    console.log(res,
      'res'
    );
  };

  return (

    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="faded" onClick={() => { setEmail("admin@gmail.com"); setPassword("admin@gmail.com"); }}>Admin Credentials</Button>
        <Button variant="faded" onClick={() => { setEmail("user@gmail.com"); setPassword("user@gmail.com"); }}>User Credentials</Button>
      </div>
      <form
        className="w-full space-y-3 max-w-md border p-4 rounded-md border-primary"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        {/* Email input */}
        <Input
          label="Email"
          variant="bordered"
          isRequired
          className="max-w-lg "
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

        {/* Forgot password */}
        <div className="text-right">
          <Link
            href="/forget-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Display errors */}
        {errors && (
          <div className="text-red-500 text-sm text-center">{errors}</div>
        )}

        {/* Submit button */}
        <SubmitBtn text="Login" isLoading={isPending} />

        {/* Divider */}
        <FormDivider />

        {/* Google Login Button */}
        <GoogleLoginBtn />

        {/* Already registered */}
        <div className="text-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
