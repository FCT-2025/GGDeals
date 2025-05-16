export default function Rewies() {
  return (
    <section className="w-full mx-auto px-8 mt-16 mb-16">
      <h2 className="text-2xl font-bold mb-6 uppercase">REVIEWS</h2>

      <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
        <p className="text-xl mr-6">Not reviews yet</p>
        <button className="bg-secondary text-center text-white py-2 px-8 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
          Rate this game
        </button>
      </div>
    </section>
  );
}
