"use client";
import Input from "@/components/common/Input";
import Loader from "@/components/common/loader";
import { handleApiResponse } from "@/utils/serverResponseHandler";
import { saveUserSession } from "@/utils/sessionManager";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/HOC/protectedRoute";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        saveUserSession(response.data.sessionToken);
        router.push("/");
      }

      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      handleApiResponse(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div className="flex min-h-screen">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm"
            noValidate
          >
            {/* Email Field */}
            <div className="mb-4">
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                error={errors?.email}
                errorMessage={errors?.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                error={errors?.password}
                errorMessage={errors?.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary py-3 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <Link href="#" className="text-sm text-secondary hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="#" className="text-secondary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section - Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/login-screen-img.png')` }}
        ></div>
      </div>
    </ProtectedRoute>
  );
};

export default LoginPage;
