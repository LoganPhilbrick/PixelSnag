import Background from "../components/Background";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
      </div>
      <Background />
    </>
  );
}
