import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
        <ContactForm />
      </div>
    </>
  );
}
