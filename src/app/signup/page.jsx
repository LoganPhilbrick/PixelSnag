"use client";
import * as Yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { signup } from "./actions";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../utils/firebase";

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative z-40 flex justify-center items-center w-full h-screen bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
      <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="container mx-auto max-w-xl h-4/5 px-4 md:px-0">
        <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50">
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              accessCode: "",
            }}
            validationSchema={signupSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                const { error } = await signup(values);
                if (error) {
                  throw new Error(JSON.stringify(error));
                }
                if (values.accessCode) {
                  router.push("/dashboard");
                } else {
                  logEvent(analytics, "sign_up");
                  router.push("/address" + "?redirectTo=/subscribe");
                }
              } catch (error) {
                alert(error);
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
                    Sign Up
                  </h1>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-neutral-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-neutral-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-neutral-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
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
                      className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="accessCode" className="text-neutral-300">
                      Access Code
                    </label>
                  </div>
                  <input
                    type="text"
                    id="accessCode"
                    name="accessCode"
                    className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset mb-4"
                    value={values.accessCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing you up..." : "Sign up"}
                  </button>
                </div>
                {errors && <p className="text-red-500">{errors[0]}</p>}
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-neutral-900 p-4">
        View our{" "}
        <Link href="/privacy-policy" className="text-blue-500">
          Privacy Policy
        </Link>
        {" and "}
        <Link href="/terms-of-use" className="text-blue-500">
          Terms of Use
        </Link>
      </div>
    </div>
  );
}

export default Page;
