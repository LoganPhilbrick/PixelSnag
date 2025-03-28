"use client";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import RoundButton from "../../../components/RoundButton";
import { useRouter } from "next/navigation";

function Canvas({ setCtx, isSidebarOpen, setIsSidebarOpen }) {
  const canvasRef = useRef(null);
  const router = useRouter();

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = canvas.toDataURL("image/png");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      setCtx(ctx);
    }
  }, [setCtx]);

  return (
    <>
      <div
        className={clsx(
          "flex-1 bg-neutral-800 flex flex-col items-center justify-center overflow-hidden relative ",
          isSidebarOpen ? "w-full" : "w-screen"
        )}
      >
        <div className="py-2 px-4 w-full flex justify-between gap-2 items-center ">
          <RoundButton
            text="Back"
            onClick={() => router.push("/dashboard")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-neutral-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            }
          />
          <div className="flex  items-center gap-2">
            <RoundButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-neutral-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                  />
                </svg>
              }
              onClick={handleDownload}
              text="Download"
            />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95"
            >
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-neutral-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-neutral-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <TransformWrapper minScale={0.1} maxScale={4}>
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
              flex: 1,
            }}
          >
            <canvas ref={canvasRef}></canvas>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
}

export default Canvas;
