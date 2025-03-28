"use client";

import React, { useState } from "react";

function FileSelector({ setScreenshotUrl }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setScreenshotUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 items-center  shadow-md bg-neutral-800 p-4 rounded-md">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />

      {/* Custom File Button */}
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-blue-600 text-neutral-300 rounded-lg shadow-md hover:bg-blue-700 transition text-sm font-bold px-4 py-2 rounded-md shrink-0"
      >
        Select Image
      </label>

      {/* Display Selected File Name */}
      {fileName ? (
        <span className="text-sm text-gray-400 truncate">{fileName}</span>
      ) : (
        <span className="text-sm text-gray-500">No file selected</span>
      )}
    </div>
  );
}

export default FileSelector;
