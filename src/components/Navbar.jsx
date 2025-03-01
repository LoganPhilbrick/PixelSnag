export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-3/4 h-48">
      <h2 className="text-3xl">PixelSnag</h2>
      <div className="md:inline hidden">
        <button className="bg-black py-4 px-8 mr-4 rounded-full">Download</button>
        <button className="bg-white text-black py-4 px-8 rounded-full">Login</button>
      </div>
    </nav>
  );
}
