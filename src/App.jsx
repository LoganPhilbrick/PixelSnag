import "./App.css";
import mesh from "./assets/mesh.png";
import appss from "./assets/appss.png";

function App() {
  return (
    <div>
      <div>
        <div className="absolute z-10 h-full w-full bottom-0 bg-linear-to-t from-[#050505] to-transparent"></div>
        <div className="w-full min-h-screen" style={{ backgroundImage: `url(${mesh})`, backgroundSize: "100% 100%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
      </div>
      <div className="flex flex-col items-center absolute top-0 z-20 w-full min-h-screen">
        <nav className="flex items-center justify-between w-3/4 h-48 ">
          <h2 className="text-3xl">Screenshot App</h2>
          <button className="bg-black py-4 px-8 rounded-full">Download</button>
        </nav>
        <div className="flex flex-col items-center w-133">
          <h1 className="text-7xl font-semibold">Screenshots.</h1>
          <h1 className="text-7xl font-semibold">Fast and easy.</h1>
        </div>
        <img src={appss} alt="image of app interface" className="w-3/5 h-auto mt-24 rounded-4xl shadow-2xl shadow-black/50" />
      </div>
      <div className="w-full h-100"></div>
    </div>
  );
}

export default App;
