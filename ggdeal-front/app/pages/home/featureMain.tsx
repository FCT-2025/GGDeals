import CardPrimary from "~/componets/cardPrimary";

export default function FeatureMain() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-epilogue text-2xl font-light text-gray-100">
          BANDAI NANCOT Entreteniments games
        </h3>
        <div className="flex space-x-4">
          <svg
            className="cursor-pointer"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9979 28C21.7299 28 27.9979 21.732 27.9979 14C27.9979 6.26803 21.7299 0 13.9979 0C6.26596 0 -0.0020752 6.26803 -0.0020752 14C-0.0020752 21.732 6.26596 28 13.9979 28ZM2.33126 14C2.33126 7.55673 7.55466 2.33333 13.9979 2.33333C20.4412 2.33333 25.6646 7.55673 25.6646 14C25.6646 20.4433 20.4412 25.6667 13.9979 25.6667C7.55466 25.6667 2.33126 20.4433 2.33126 14ZM16.165 19.2331L13.0252 14L16.165 8.76692C16.4965 8.21438 16.3174 7.49782 15.7648 7.16625C15.2123 6.8348 14.4957 7.01388 14.1642 7.56642L10.6642 13.3998C10.5554 13.5811 10.4979 13.7885 10.4979 14C10.4979 14.2115 10.5554 14.4189 10.6642 14.6003L14.1642 20.4336C14.4957 20.9861 15.2123 21.1652 15.7648 20.8338C16.3174 20.5022 16.4965 19.7856 16.165 19.2331Z"
              fill="#FF9800"
            />
          </svg>
          <svg
            className="cursor-pointer"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0C6.26806 0 -0.000441347 6.26803 -0.00102342 14C-0.00160549 21.732 6.26596 28 13.9979 28C21.7299 28 27.9984 21.732 27.999 14C27.9996 6.26803 21.732 0 14 0ZM25.6656 14C25.6652 20.4433 20.4414 25.6667 13.9981 25.6667C7.55483 25.6667 2.33182 20.4433 2.33231 14C2.33279 7.55673 7.55659 2.33333 13.9999 2.33333C20.4431 2.33333 25.6661 7.55673 25.6656 14ZM11.8323 8.76692L14.9717 14L11.8315 19.2331C11.5 19.7856 11.679 20.5022 12.2315 20.8337C12.7841 21.1652 13.5006 20.9861 13.8322 20.4336L17.3327 14.6002C17.4415 14.4189 17.499 14.2115 17.499 14C17.499 13.7885 17.4416 13.5811 17.3328 13.3997L13.8332 7.56642C13.5017 7.01388 12.7851 6.8348 12.2326 7.16625C11.68 7.49782 11.5009 8.21438 11.8323 8.76692Z"
              fill="#FF9800"
            />
          </svg>
        </div>
      </div>
      <div className="flex space-x-2">
        {featuresGames.map((card) => (
          <div className="w-[33.33%]">
            <CardPrimary
              src={card.src}
              alt={card.alt}
              description={card.description}
              prize={card.prize}
              discount={card.discount}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

const featuresGames = [
  {
    src: "/img/cardPrimary.png",
    alt: "cardPrimary",
    description: "Essential Knowledge: Learn Something New by MIT Press",
    prize: "19.99",
    discount: "29.99",
  },
  {
    src: "/img/cardPrimary.png",
    alt: "cardPrimary",
    description: "Essential Knowledge: Learn Something New by MIT Press",
    prize: "19.99",
    discount: "29.99",
  },
  {
    src: "/img/cardPrimary.png",
    alt: "cardPrimary",
    description: "Essential Knowledge: Learn Something New by MIT Press",
    prize: "19.99",
    discount: "29.99",
  },
];
