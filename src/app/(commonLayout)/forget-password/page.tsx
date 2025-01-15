"use client";
import { useForgetPassword } from "@/hooks/auth.hook";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutate } = useForgetPassword();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({ email });
    // Here you would typically trigger your backend logic for password reset
    // For now, let's simulate a successful password reset request
    setMessage(
      "If this email exists, you will receive a password reset link shortly."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-default-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-default-600">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-default-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-default-50 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-4 text-center text-sm text-green-600">
              {message}
            </div>
          )}
        </form>

        {/* Back to Login Link */}
        <div className="text-center text-sm">
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
