import React from "react";
import CookieConsent from "../components/CookiesConsent";
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import Features from "../components/Features";
import VideoSection from "../components/VideoSection";
import Footer from "../components/Footer";
import SubscriptionCard from "../components/SubscriptionCard";
export default function Home() {
  return (
    <>
      <div className="relative z-40">
        <Hero />
        <Features />
        <VideoSection />
        <SubscriptionCard
          containerClass="sm:flex   mx-auto mt-24"
          showButton
          showBackground
        />
        <ContactForm />
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}
