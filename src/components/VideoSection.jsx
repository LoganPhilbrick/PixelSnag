import React from "react";

export default function VideoSection() {
  return (
    <div id="showcase" className="flex flex-col items-center w-full">
      <h2 className="text-xl md:text-3xl lg:text-5xl px-6 font-semibold bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text my-12 sm:my-24 p-1.5">Easy as 1, 2, 3...</h2>
      <div className="flex xl:flex-row flex-col-reverse items-center justify-between md:w-2/3 xl:w-2/3 xl:px-0 px-12 mb-24">
        <video autoPlay loop muted className="w-full xl:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//ss.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex items-start w-full xl:w-fit xl:px-24 mb-12 xl:mb-0">
          <p className="text-5xl font-semibold mr-4">1</p>
          <p className="text-sm sm:text-base text-start">Take a screenshot by pressing CTRL(CMD on Mac) + ALT + SHFT + S on your keyboard.</p>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col items-center justify-between md:w-2/3 xl:w-2/3 xl:px-0 px-12 mb-24">
        <div className="flex items-start w-full xl:w-fit xl:px-24 mb-12 xl:mb-0">
          <p className="text-5xl font-semibold mr-4">2</p>
          <p className="text-sm sm:text-base text-start">Screenshots will automatically open in the PixelSnag photo editor.</p>
        </div>
        <video autoPlay loop muted className="w-full xl:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//edit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex xl:flex-row flex-col-reverse items-center justify-between md:w-2/3 xl:w-2/3 xl:px-0 px-12">
        <video autoPlay loop muted className="w-full xl:w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//share.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex items-start w-full xl:w-fit xl:px-24 mb-12 xl:mb-0">
          <p className="text-5xl font-semibold mr-4">3</p>
          <p className="text-sm sm:text-base text-start">Edited screenshots can be exported or copied directly to the clipboard for pasting and sharing.</p>
        </div>
      </div>
    </div>
  );
}
