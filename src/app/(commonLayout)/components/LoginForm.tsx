"use client"
// import React, { createRef, useEffect } from 'react';
// import { useFormState } from 'react-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { Divider } from '@nextui-org/react';
import GoogleLoginBtn from './shared/GoogleLoginBtn';

const LoginForm = () => {
    // const [state, formAction] = useFormState(createCar, null);
    // const ref = createRef<HTMLFormElement>();

    // useEffect(() => {
    //   if (state && state?.success) {
    //     alert(state?.message);
    //     ref.current!.reset();
    //   }
  
    //   if (state && !state?.success) {
    //     alert(state?.message);
    //   }
    // }, [state, ref]);
  
    return (
        <form
        // ref={ref}
        // action={formAction}
        className="w-full space-y-6 max-w-md"
      >
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        {/* Email input */}
        <FormInput type="email" label="Email" />

        {/* Password input */}
        <FormInput type="password" label="Password" />

        {/* Forgot password */}
        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot your password?
          </a>
        </div>

        {/* Submit button */}
        <SubmitBtn text="Login" />

        {/* Divider */}
        <Divider className="my-4 bg-primary/50" />

        {/* Google Login Button */}
        <GoogleLoginBtn />
        {/* Already registered */}
        <div className="text-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Register here
            </a>
          </p>
        </div>
      </form>
    );
};

export default LoginForm;