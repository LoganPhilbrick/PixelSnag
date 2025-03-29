"use client";
import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import clsx from "clsx";
import { utils } from "../../constants/images";

export default function Page() {
  const [ctx, setCtx] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [screenshotUrl, setScreenshotUrl] = useState(utils.placeholder);

  return (
    <div
      className={clsx(
        "flex h-screen w-screen overflow-x-hidden bg-neutral-800"
      )}
    >
      <Canvas
        setCtx={setCtx}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setScreenshotUrl={setScreenshotUrl}
      />
      <Sidebar
        ctx={ctx}
        isSidebarOpen={isSidebarOpen}
        screenshotUrl={screenshotUrl}
        setScreenshotUrl={setScreenshotUrl}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}
