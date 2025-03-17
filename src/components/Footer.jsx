import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-neutral-900 py-12 px-6">
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 grid-rows-2 sm:grid-rows-1 gap-6 ">
        <div className="flex items-center justify-center gap-2 sm:row-span-1 row-span-2 col-span-3 sm:col-span-1 mb-6 sm:mb-0">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <h2 className="text-3xl">PixelSnag</h2>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-2 font-light">
            <h4 className="font-normal mb-2">Navigation</h4>
            <a href="#hero">Welcome</a>
            <a href="#features">Features</a>
            <a href="#">Showcase</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-2 font-light">
            <h4 className="font-normal mb-2">More</h4>
            <a href="#">Sign Up</a>
            <a href="#">Login</a>
          </div>
        </div>
        <div className="w-full flex justify-center row-span-2">
          <div className="flex flex-col gap-2 font-light">
            <h4 className="font-normal mb-2">Resources</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
