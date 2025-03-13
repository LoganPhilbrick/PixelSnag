import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center z-20 w-full bg-[url(/mesh.png)] bg-center bg-no-repeat bg-[length:100%_100%]">
      <div className="absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <Navbar />
      <div className="flex flex-col items-center w-full lg:w-133 ">
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Screenshots.</h1>
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Fast and easy.</h1>
      </div>
      <img src="/appss.png" alt="image of app interface" className="w-4/5 2xl:w-3/5 h-auto mt-12 sm:mt-24 rounded-2xl shadow-2xl shadow-black/50" />
    </div>
  );
}
