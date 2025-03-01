import "./App.css";
import Background from "./components/Background";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl my-24">Don't waste your time with boring screenshots.</h2>
      </div>
      <Background />
    </>
  );
}

export default App;
