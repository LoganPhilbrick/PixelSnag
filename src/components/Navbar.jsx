import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import Image from "next/image";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between w-3/4 h-48">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={24} height={24} />
        <h2 className="text-3xl">PixelSnag</h2>
      </div>
      <div className="md:inline hidden">
        {!data.user && (
          <>
            <Link
              href="/login"
              className="bg-black py-4 px-8 mr-4 rounded-full hover:bg-neutral-900 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-black py-4 px-8 rounded-full hover:bg-neutral-200 transition-all duration-200"
            >
              Signup
            </Link>
          </>
        )}
        {data.user && (
          <Link
            href="/dashboard"
            className="bg-black py-4 px-8 mr-4 rounded-full hover:bg-neutral-900 transition-all duration-200"
          >
            Dashboard
          </Link>
        )}
      </div>
      {/* eslint-disable-next-line no-undef */}
    </nav>
  );
}
