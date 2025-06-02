import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";
import CardPrize from "./cardsComponents/CardPrize";

export default function CardSecondary(card: CardsProps) {
  return (
    <div className={`relative ${card.className}`}>
      <CardDiscountBadge discount={card.discount} />
      <div className="relative border-1 w-full">
        <img src={card.src} alt="Game" className="w-full" />
        <div className="absolute bottom-0 w-full bg-[rgba(0,0,0,0.5)]">
          <p className="text-center">
            {card.name} - {card.edition}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        {card.plataforms &&
          card.plataforms.map((plataform, index) => (
            <div
              key={`card-plataform${index}`}
              className="flex justify-center items-center p-2 border-1 border-t-0 rounded-bl-lg rounded-br-lg"
            >
              {plataform}
            </div>
          ))}
        <div className="flex justify-center items-center space-x-2 p-1">
          <span className="text-primary">{card.prize}$</span>
          <CardPrize discount={card.discount}/>
        </div>
      </div>
    </div>
  );
}