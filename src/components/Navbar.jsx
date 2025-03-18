"use client";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();
      setData(data);
    };
    fetchData();
  }, [supabase]);

  return (
    <nav className="flex items-center justify-between h-24 w-full px-4">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={24} height={24} />
        <h2 className="text-3xl">PixelSnag</h2>
      </div>
      <div className="inline md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-neutral-900/50 backdrop-blur-sm">
          <button onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-20 right-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col p-4 justify-center h-full gap-4">
            <Link href="/login" className="bg-black py-4 px-8 rounded-full hover:bg-neutral-900 transition-all duration-200 text-center">
              Login
            </Link>
            <Link href="/signup" className="bg-white text-black py-4 px-8 rounded-full hover:bg-neutral-200 transition-all duration-200 text-center">
              Signup
            </Link>
          </div>
        </div>
      )}
      <div className="md:inline hidden">
        {!data ||
          (!data.user && (
            <>
              <Link href="/login" className="bg-black py-4 px-8 mr-4 rounded-full hover:bg-neutral-900 transition-all duration-200">
                Login
              </Link>
              <Link href="/signup" className="bg-white text-black py-4 px-8 rounded-full hover:bg-neutral-200 transition-all duration-200">
                Download
              </Link>
            </>
          ))}
        {data && data.user && (
          <Link href="/dashboard" className="bg-black py-4 px-8 mr-4 rounded-full hover:bg-neutral-900 transition-all duration-200">
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
