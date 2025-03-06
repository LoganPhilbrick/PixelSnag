export default function Background() {
  return (
    <div className="absolute top-0 z-0 w-full min-h-screen" style={{ backgroundImage: `url(/mesh.png)`, backgroundSize: "100% 100%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="absolute  h-full w-full bg-linear-to-t from-[#050505] to-transparent"></div>
    </div>
  );
}
