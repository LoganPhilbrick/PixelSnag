import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
        <Features />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}
