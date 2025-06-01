import CardPrimary from "~/componets/cards/CardPrimary";
import IconSlideButton from "../../assets/icons/icon-slide-button.svg?react";

export default function CompanyGames({
  companyName,
  isMain,
  className
}: {
  companyName: string;
  isMain: boolean;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h3 className="font-epilogue text-xl sm:text-2xl font-light text-gray-100 mb-2 sm:mb-0">
          {companyName}
        </h3>
        <div className="flex space-x-2 sm:space-x-4">
          <IconSlideButton className="cursor-pointer w-8 h-8 sm:w-auto sm:h-auto" />
          <IconSlideButton className="cursor-pointer rotate-180 w-8 h-8 sm:w-auto sm:h-auto" />
        </div>
      </div>
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4`}>
        {featuresGames.map((card, index) => (
          <CardPrimary
            className={`flex-1 w-full h-[400px] ${isMain ? 'h-full' : 'h-[400px]'}`}
            key={`featuresGames-${index}`} 
            src={card.src}
            alt={card.alt}
            title={card.description}
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
