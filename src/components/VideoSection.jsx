import React from "react";

export default function VideoSection() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-2/3 mt-24">
        <video autoPlay loop muted className="w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//ss.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="w-1/3">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
      </div>
      <div className="flex justify-between items-center w-2/3 mt-24">
        <p className="w-1/3">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
        <video autoPlay loop muted className="w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//edit.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex justify-between items-center w-2/3 mt-24">
        <video autoPlay loop muted className="w-1/2 rounded-xl">
          <source src="https://cgkethnnnnsxbzvglfmn.supabase.co/storage/v1/object/public/sample-videos//share.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
        <p className="w-1/3">Take a screenshot by pressing CTRL + ALT + SHFT + S on your keyboard.</p>
      </div>
    </div>
  );
}
