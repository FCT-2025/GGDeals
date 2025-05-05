import { Link } from "react-router";

export default function Charity() {
  return (
    <section className="bg-[url('/img/charity-bg.png')] bg-cover bg-no-repeat bg-center w-full h-[20vh] rounded-lg p-5">
      <div>
        <h2 className="text-2xl font-bold font-epilogue mb-3">
          Dedicated to Supporting Charity
        </h2>
        <p className="w-1/2 text-lg font-ekMukta tracking-wide">
          OUR BEST DISCOUNTS ON SUMMER’S OUR BEST DISCOUNTS ON SUMMER’S HOTTEST
          GAMES GAMES
        </p>

        <Link to="/charity">
          <button className="mt-4 text-primary font-bold text-xl cursor-pointer">
            Learn More
          </button>
        </Link>
      </div>
    </section>
  );
}
