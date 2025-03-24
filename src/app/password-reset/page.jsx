"use client";
import React, { useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: e.target[0].value,
      });
      if (error) {
        throw new Error(JSON.stringify(error.message));
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="relative z-40 flex justify-center items-center w-full h-screen bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
        <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="container mx-auto max-w-xl  px-4 md:px-0">
          <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50 py-8">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-6">
                <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">
                  Reset Password
                </h1>
                <label htmlFor="password" className="text-neutral-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset "
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
