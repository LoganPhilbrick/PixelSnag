import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-neutral-900 py-12 px-6">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 gap-6 ">
        <div className="flex items-center justify-center gap-2 sm:row-span-1 row-span-2 col-span-3 sm:col-span-1 mb-6 sm:mb-0">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <h2 className="text-3xl">PixelSnag</h2>
        </div>
        <div className="w-full flex justify-center ">
          <div className="flex flex-col gap-2 font-light">
            <h4 className="font-normal">Navigation</h4>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#">Showcase</a>
            <a href="#">Contact</a>
          </div>
        </div>
        {/* <div className="w-full flex justify-center">
      <div className="flex flex-col gap-2 font-light">
        <h4 className="font-normal">Contact</h4>
        <a href="#">Email</a>
        <a href="#">Phone</a>
      </div>
    </div> */}
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-2 font-light">
            <h4 className="font-normal">Downloads</h4>
            <a href="#">Version 0.1.6</a>
            <a href="#">Version 0.1.5</a>
            <a href="#">Version 0.1.4</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
