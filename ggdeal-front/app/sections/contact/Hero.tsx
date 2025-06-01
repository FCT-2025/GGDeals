export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] mt-35">
      <div className="hidden md:block w-full h-full">
        <img
          src="/img/contact-hero.png"
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="block md:hidden w-full h-full">
        <img
          src="/img/vistajuego8.png" 
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-4 sm:left-6 md:left-10 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          CONTACT HERE!
        </h1>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
}