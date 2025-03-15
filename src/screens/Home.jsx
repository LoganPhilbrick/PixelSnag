import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import Features from "../components/Features";
import VideoSection from "../components/VideoSection";

export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
        <Features />
        <VideoSection />
        <ContactForm />
      </div>
    </>
  );
}
