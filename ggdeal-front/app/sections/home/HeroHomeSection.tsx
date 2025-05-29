export default function Hero() {
  return (
    <main className="relative">
      <div className="hidden lg:block bg-[url('/img/hero-bg.jpg')] bg-cover bg-no-repeat bg-center h-screen w-full"></div>
      
      <div className="block lg:hidden bg-[url('/img/vistajuego1.png')] bg-cover bg-no-repeat bg-center h-[60vh] sm:h-[70vh] md:h-[80vh] w-full"></div>
      
      <h1 className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ml-auto w-fit text-right right-[5%] sm:right-[8%] top-[40%] sm:top-[35%] lg:top-[30%] font-nouvel font-bold">
        <span className="text-primary">Play</span> More.{" "}
        <span className="text-primary"></span> Less.
        <br className="hidden sm:block" />
        <span className="block sm:inline">Level Up Your <span className="text-primary">Game</span>.</span>
      </h1>
    </main>
  );
}
