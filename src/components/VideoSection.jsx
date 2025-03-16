import React from "react";

export default function VideoSection() {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl md:text-3xl lg:text-5xl px-6 font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text mt-12 sm:mt-24 p-1.5">Here's how it works</h2>
      <div className="flex lg:flex-row flex-col-reverse justify-evenly xl:justify-between items-center lg:w-full xl:w-2/3 mt-12 sm:mt-24">
        <video autoPlay loop muted className="w-5/6 md:w-2/3 lg:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//ss.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="w-5/6 md:w-2/3 lg:w-1/3 xl:w-full xl:p-24 text-start lg:mb-0 mb-12">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
      </div>
      <div className="flex lg:flex-row flex-col justify-evenly xl:justify-between items-center lg:w-full xl:w-2/3 mt-12 sm:mt-24">
        <p className="w-5/6 md:w-2/3 lg:w-1/3 xl:w-full xl:p-24 text-start lg:mb-0 mb-12">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
        <video autoPlay loop muted className="w-5/6 md:w-2/3 lg:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//edit.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-evenly xl:justify-between items-center lg:w-full xl:w-2/3 mt-12 sm:mt-24">
        <video autoPlay loop muted className="w-5/6 md:w-2/3 lg:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//share.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="w-5/6 md:w-2/3 lg:w-1/3 xl:w-full xl:p-24 text-start lg:mb-0 mb-12">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
      </div>
    </div>
  );
}
