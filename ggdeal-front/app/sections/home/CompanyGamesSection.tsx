import CardPrimary from "~/componets/cards/CardPrimary";
import IconSlideButton from "../../assets/icons/icon-slide-button.svg?react";

export default function CompanyGames({
  companyName,
  isMain,
}: {
  companyName: string;
  isMain: boolean;
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-epilogue text-2xl font-light text-gray-100">
          {companyName}
        </h3>
        <div className="flex space-x-4">
          <IconSlideButton className="cursor-pointer" />
          <IconSlideButton className="cursor-pointer rotate-180" />
        </div>
      </div>
      <div className={`flex w-full space-x-2 justify-center items-center flex-wrap ${ isMain ? "h-full" : "h-[55vh]" }`}>
        {featuresGames.map((card, index) => (
            <CardPrimary
              className="flex-1 w-full h-full flex flex-col"
              key={`featuresGames-${index}`} 
              src={card.src}
              alt={card.alt}
              description={card.description}
              prize={card.prize}
              discount={card.discount}
            />
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
    prize: 19.99,
    discount: 29.99,
  },
  {
    src: "/img/cardPrimary.png",
    alt: "cardPrimary",
    description: "Essential Knowledge: Learn Something New by MIT Press",
    prize: 19.99,
    discount: 29.99,
  },
  {
    src: "/img/cardPrimary.png",
    alt: "cardPrimary",
    description: "Essential Knowledge: Learn Something New by MIT Press",
    prize: 19.99,
    discount: 29.99,
  },
];
