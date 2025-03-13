"use client";

import React from "react";

export default function Features() {
  const cardInfo = [
    {
      title: "Intuitive screenshots",
      text: "Capture sections, windows, or full screens with ease, or upload your own images for editing—available on both Windows and macOS.",
      icon: "https://img.icons8.com/?size=100&id=112990&format=png&color=e9e9e9",
      id: "1",
    },
    { title: "Edit with ease", text: "Create stunning, professional-looking images in just a few clicks.", icon: "https://img.icons8.com/?size=100&id=98520&format=png&color=e9e9e9", id: "2" },
    {
      title: "Diverse backgrounds",
      text: "Enhance your screenshots with a variety of creative backdrops for a unique touch.",
      icon: "https://img.icons8.com/?size=100&id=112856&format=png&color=e9e9e9",
      id: "3",
    },
    {
      title: "Choose your platform",
      text: "Export in popular aspect ratios optimized for different social media platforms.",
      icon: "https://img.icons8.com/?size=100&id=87532&format=png&color=e9e9e9",
      id: "4",
    },
    {
      title: "Powered by AI",
      text: "Generate AI-powered descriptions to instantly summarize your screenshots.",
      icon: "https://img.icons8.com/?size=100&id=rfkqAnUspAnn&format=png&color=e9e9e9",
      id: "5",
    },
    {
      title: "Ready to share",
      text: "Quickly copy images to your clipboard or save them locally for seamless sharing.",
      icon: "https://img.icons8.com/?size=100&id=82713&format=png&color=e9e9e9",
      id: "6",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center mt-12 sm:mt-24">
        <h2 className="text-xl md:text-3xl lg:text-5xl px-6 font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text p-1.5">Say goodbye to boring screenshots</h2>
        <h3 className="text-md md:text-xl lg:text-2xl bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text px-6 mt-6">Explore the comprehensive features of PixelSnag</h3>

        <div className="grid grid-rows-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-8 justify-center w-full sm:w-2/3 mt-12 sm:mt-24">
          {cardInfo.map((card, index) => (
            <div key={index} className="col-span-1 bg-[#0e0e0e] rounded-xl">
              <div className="p-6">
                <img src={card.icon} alt="icon" className="w-16 pb-2" />
                <h4 className="lg:text-xl font-semibold py-4">{card.title}</h4>
                <p className="text-sm lg:text-base">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
