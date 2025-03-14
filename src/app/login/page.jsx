import React from "react";
import Link from "next/link";
import { login } from "./actions";

export default function Page() {
  return (
    <>
      <div className="relative z-40 flex justify-center items-center w-full h-screen bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
        <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="container mx-auto max-w-xl h-4/5 px-4 md:px-0">
          <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50">
            <form className="w-full max-w-md" action={login}>
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
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-neutral-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset mb-4"
                  />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    tabIndex="-1"
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: 0,
                      height: 0,
                      zIndex: -1,
                    }}
                  />
                </div>

                <div className="flex flex-col items-center w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                  >
                    Log In
                  </button>
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
          </div>
        </div>
      </div>
    </>
  );
}
