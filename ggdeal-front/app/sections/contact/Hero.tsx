export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] mt-35">
      <img
        src="/img/contact-hero.png"
        alt="Contact Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-10 left-10">
        <h1 className="text-5xl font-bold">CONTACT HERE!</h1>
      </div>
    </section>
  );
}
