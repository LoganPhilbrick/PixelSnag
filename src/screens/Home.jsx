import React from "react";
import CookieConsent from "../components/CookiesConsent";
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import Features from "../components/Features";

export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
        <Features />
        <ContactForm />
        <CookieConsent />
      </div>
    </>
  );
}
