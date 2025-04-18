"use client";
import React from "react";
import { hasCookie, setCookie } from "cookies-next";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-neutral-900 z-50">
      <span className="text-dark text-base mr-16">
        This website uses cookies to improve user experience. By using our
        website you consent to all cookies in accordance with our Cookie Policy.
      </span>
      <button
        className="bg-blue-600 hover:bg-blue-700 py-2 px-8 rounded text-white"
        onClick={() => acceptCookie()}
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
