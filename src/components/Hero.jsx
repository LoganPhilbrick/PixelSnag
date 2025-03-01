import appss from "../assets/appss.png";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center z-20 w-full">
      <Navbar />
      <div className="flex flex-col items-center w-full lg:w-133 ">
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Screenshots.</h1>
        <h1 className="text-5xl sm:text-7xl font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">Fast and easy.</h1>
      </div>
      <img src={appss} alt="image of app interface" className="w-4/5 lg:w-3/5 h-auto mt-24 rounded-4xl shadow-2xl shadow-black/50" />
    </div>
  );
}
