"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "./actions";
import ResetPasswordModal from "../../components/ResetPasswordModal";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const handleResetPasswordButtonClick = () => {
    setIsResetPasswordModalOpen(true);
  };

  return (
    <>
      <div className="relative z-40 flex justify-center items-center w-full h-screen bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
        {isResetPasswordModalOpen && (
          <ResetPasswordModal
            isOpen={isResetPasswordModalOpen}
            onClose={() => setIsResetPasswordModalOpen(false)}
          />
        )}
        <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="container mx-auto max-w-xl h-4/5 px-4 md:px-0">
          <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50">
            <Formik
              initialValues={{
                email: "",
                password: "",
                username: "",
              }}
              validationSchema={loginSchema}
              onSubmit={async (values, { setErrors }) => {
                console.log(values);
                setIsLoading(true);
                try {
                  await login(values);
                } catch (error) {
                  console.error("Login failed:", error);
                  setErrors({ submit: "Login failed. Please try again." });
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">
                      Log In
                    </h1>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-neutral-300">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password" className="text-neutral-300">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-center w-full">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Log In"}
                      </button>
                      {errors.submit && (
                        <p className="text-red-500 mt-2">{errors.submit}</p>
                      )}
                      <div className="flex items-center">
                        <p className="m-2">or</p>
                      </div>
                      <Link
                        href="/signup"
                        className="bg-zinc-500/50 hover:bg-emerald-500 text-white p-2 rounded-md text-center w-full"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
            <div className="container mx-auto max-w-md">
              <button
                onClick={handleResetPasswordButtonClick}
                className="text-blue-500 hover:text-blue-600 underline self-start mt-4"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
