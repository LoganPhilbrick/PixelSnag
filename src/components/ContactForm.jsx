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
    <div className="flex flex-col items-center mt-12 sm:mt-24">
      <h2 className="text-2xl md:text-3xl lg:text-5xl px-6 font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text p-1.5 mb-12 sm:mb-24">Wanna get in touch?</h2>
      <div className="container md:w-1/2 w-full h-full px-6 pb-6 mx-auto mb-24 rounded-xl sm:bg-neutral-900">
        <h1 className="text-2xl font-bold sm:my-4 pl-7 sm:pl-0 text-neutral-200">Feedback</h1>
        <div className=" flex items-center justify-center ">
          <iframe
            className="rounded-lg sm:bg-neutral-800 p-6"
            data-tally-src="https://tally.so/embed/nPk2px?alignLeft=1&hideTitle=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="276"
            color=""
            title="Contact form"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
