import Navbar from "./Navbar";
import Link from "next/link";

export default function Hero() {
  return (
    <div id="hero" className="relative flex flex-col items-center z-20 w-full bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
      <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <Navbar />
      <div className="flex flex-col items-center w-full lg:w-133 ">
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Screenshots.</h1>
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Fast and easy.</h1>
      </div>
      <Link href="/signup" className="bg-blue-600 text-lg py-6 px-12 mt-12 rounded-full hover:bg-blue-700 transition-all duration-200">
        Download Now
      </Link>
      <img src="/hero.png" alt="image of app interface" className="w-4/5 2xl:w-3/5 h-auto mt-12  rounded-2xl shadow-2xl shadow-black/50" />
    </div>
  );
}
