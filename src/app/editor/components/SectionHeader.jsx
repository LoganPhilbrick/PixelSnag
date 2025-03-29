"use client";

import React from "react";

function SectionHeader({ title }) {
  return (
    <div className="p-2 bg-cover bg-center bg-gradient-to-r from-[#8338ec] to-[#ff006e] rounded flex-1">
      <h3 className="text-md text-neutral-300 font-semibold text-shadow-md">
        {title}
      </h3>
    </div>
  );
}

export default SectionHeader;
