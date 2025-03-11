import Link from "next/link";
import { createClient } from "../utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between w-3/4 h-48">
      <h2 className="text-3xl">PixelSnag</h2>
      <div className="md:inline hidden">
        {!data.user && (
          <>
            <Link
              href="/login"
              className="bg-black py-4 px-8 mr-4 rounded-full"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-black py-4 px-8 rounded-full"
            >
              Signup
            </Link>
          </>
        )}
        {data.user && (
          <Link
            href="/subscribe"
            className="bg-black py-4 px-8 mr-4 rounded-full"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
