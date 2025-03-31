import React from "react";

function WindowsWarningModal({ onAccept, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className=" p-8 rounded-lg shadow-lg z-10 bg-neutral-800 max-w-lg">
        <h3 className="text-lg font-bold text-neutral-300 mb-4 border-b border-neutral-700 pb-2">
          Heads up: Windows SmartScreen Warning
        </h3>
        <p className="mb-4">
          The Windows version of PixelSnag is not currently code signed, which
          means you may see a SmartScreen warning when you try to install it.
          This is <strong>completely safe</strong>—the app hasn’t been tampered
          with, and it’s the same clean build we distribute on macOS.
        </p>
        <p className="mb-4">
          We're a small indie team and code signing for Windows requires a
          certificate that’s currently out of our budget. We plan to add it as
          soon as we can.
        </p>
        <p className="mb-4">
          In the meantime, if you're comfortable proceeding:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-4">
            Click <strong>"More info"</strong> on the SmartScreen dialog
          </li>
          <li className="mb-4">
            Then click <strong>"Run anyway"</strong> to install
          </li>
        </ul>
        <p className="mb-6">Thanks for supporting indie software ❤️</p>
        <div className="flex">
          <button className="flex-1" onClick={() => onClose()}>
            Nevermind
          </button>
          <a
            href={onAccept}
            className="bg-blue-600 transition-all hover:bg-blue-700 mr-auto p-4 rounded-md flex items-center justify-center flex-1 "
            onClick={() => onClose()}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default WindowsWarningModal;
