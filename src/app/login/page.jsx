"use client";
import React from "react";
import Background from "../../components/Background";
import * as Yup from "yup";
import { useState, useContext } from "react";
import { SupabaseContext } from "../../contexts/SupabaseContext";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export default function Page() {
  // Keep 'Page' to match the Next.js routing system
  const router = useRouter();
  const { auth } = useContext(SupabaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="relative z-40 flex justify-center items-center w-full h-screen">
        <div className="container mx-auto max-w-xl h-4/5 px-4 md:px-0">
          <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={async (values) => {
                setIsLoading(true);
                setErrorMessage(""); // Reset error message
                const { error } = await auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });
                setIsLoading(false);
                if (error) {
                  setErrorMessage(error.message);
                  return;
                }
                router.push("/"); // Redirect on successful login
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">Log In</h1>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-neutral-300">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password" className="text-neutral-300">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset mb-4"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <div className="flex flex-col items-center w-full">
                      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In"}
                      </button>
                      <div className="flex items-center">
                        <p className="m-2">or</p>
                      </div>
                      <Link href="/signup" className="bg-zinc-500/50 hover:bg-emerald-500 text-white p-2 rounded-md text-center w-full" disabled={isLoading}>
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Background />
    </>
  );
}
