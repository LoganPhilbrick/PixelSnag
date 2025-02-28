import "./App.css";
import Background from "./components/Background";
import Hero from "./components/Hero";

function App() {
  return (
    <div>
      <div className="relative z-40">
        <Hero />
      </div>
      <Background />
    </div>
  );
}

export default App;
