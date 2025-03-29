"use client";

import { useRef, useState } from "react";

function ColorSelector({ setColor, value }) {
  const inputRef = useRef(null);
  const [bgColor, setBgColor] = useState("#000000");
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };

  const handleSelectColor = (e) => {
    setColor(e.target.value);
    setBgColor(e.target.value);
  };

  return (
    <div>
      {isIOS ? (
        <input
          ref={inputRef}
          type="color"
          onChange={(e) => setColor(e.target.value)}
          value={value}
        />
      ) : (
        <>
          <div
            className="w-full h-12 rounded-md cursor-pointer shadow-md p-0 m-0"
            onClick={() => {
              inputRef.current?.click();
            }}
            style={{ backgroundColor: bgColor }}
          />
          <input
            ref={inputRef}
            type="color"
            onChange={(e) => handleSelectColor(e)}
            className="w-0 h-0 p-0 m-0"
            value={value || ""}
          />{" "}
        </>
      )}
    </div>
  );
}

export default ColorSelector;
