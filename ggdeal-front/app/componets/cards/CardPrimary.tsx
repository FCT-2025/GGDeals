import CardPrize from "./cardsComponents/CardPrize";
import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";
import IconCardBlack from "../../assets/icons/icon-cart-black.svg?react";

export default function CardPrimary(
  card: CardsProps,
) {
  return (
    <div className={`relative ${card.className}`}>
      <img
        className="w-full h-full min-h-0 object-cover object-center rounded-tl-lg rounded-tr-lg"
        src={card.src}
        alt={card.alt}
      />
      <CardDiscountBadge discount={card.discount} />

      <p className="font-sofia text-lg p-2">{card.description}</p>
      <div className="flex w-full">
        <div className="flex-[1] bg-primary flex space-x-2 items-center justify-center py-2 rounded-bl-lg cursor-pointer">
          <IconCardBlack />
          <span className="text-black font-nouvel font-bold">Add To Cart</span>
        </div>
        <div className="flex-[1] flex bg-gray-800 space-x-2 items-center justify-center py-2 rounded-br-lg">
          <span className="text-primary">{card.prize}$</span>
          <CardPrize discount={card.discount} />
        </div>
      </div>
    </div>
  );
}
