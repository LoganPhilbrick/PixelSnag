"use client";

import { useEffect } from "react";

// Declare the Tally types

function ContactForm() {
  // The code below will load the embed
  useEffect(() => {
    const widgetScriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      // Load Tally embeds
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
        return;
      }

      // Fallback if window.Tally is not available
      document.querySelectorAll <
        HTMLIFrameElement >
        "iframe[data-tally-src]:not([src])".forEach((iframeEl) => {
          if (iframeEl.dataset.tallySrc) {
            iframeEl.src = iframeEl.dataset.tallySrc;
          }
        });
    };

    // If the Tally widget script is not loaded yet, load it
    if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
      const script = document.createElement("script");
      script.src = widgetScriptSrc;
      script.async = true; // Add async loading
      script.onload = () => {
        // Wait a brief moment for Tally to initialize
        setTimeout(load, 100);
      };
      script.onerror = (error) => {
        load();
      };
      document.body.appendChild(script);
    } else {
      setTimeout(load, 100);
    }
  }, []);

  return (
    <div className="container h-full px-4 mx-auto mb-24">
      <h1 className="text-2xl font-bold my-4 text-neutral-200">Feedback</h1>
      <div className=" flex items-center justify-center ">
        <iframe data-tally-src="https://tally.so/embed/nPk2px?alignLeft=1&hideTitle=1&dynamicHeight=1" loading="lazy" width="100%" height="276" title="Contact form"></iframe>
      </div>
    </div>
  );
}

export default ContactForm;
