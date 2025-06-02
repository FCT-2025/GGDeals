import CardPrize from "./cardsComponents/CardPrize";
import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";
import IconCardBlack from "../../assets/icons/icon-cart-black.svg?react";
import type { CardsProps } from "./CardsProps";
import { Link } from "react-router";
import { TypeGame } from "~/types/Game";
import type { Plataform } from "~/services/PlataformService";

export default function CardPrimary(card: CardsProps) {
  return (
    <div
      className={`flex flex-col bg-black rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-[1.02] ${card.className}`}
    >
      <img
        className="w-full min-h-0 h-full object-cover object-center"
        src={card.src ? card.src : "/img/image-default.jpg"}
        alt={card.alt}
      />

      {card.discount && <CardDiscountBadge discount={card.discount} />}

      <div className="flex-grow p-3 flex flex-col">
        <p className="font-sofia text-base sm:text-lg text-white mb-2 line-clamp-2">
          {card.title}
        </p>

        {card.plataforms && card.plataforms.length > 0 && (
          <div className="flex flex-wrap justify-between align-center gap-2 mt-auto">
            {card.plataforms.map((platform: Plataform, idx) => (
              <span
                key={`platform-${idx}`}
                className="text-xs bg-gray-800 text-gray-300 p-2 rounded"
              >
                {platform.pathLogo ? (
                  <img src={`${platform.pathLogo}`} alt={`${platform.name}`} />
                ) : (
                  platform.name
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full mt-auto">
        <Link
          className="flex-1 bg-primary hover:bg-primary/90 flex items-center justify-center py-3 space-x-2 transition-colors"
          to={`/game/${card.nameSlug}`}
        >
          <IconCardBlack className="w-5 h-5" />
          <span className="text-black font-nouvel font-bold text-sm sm:text-base whitespace-nowrap">
            {card.type == TypeGame.PREORDER ? "Preorder Now" : "Add To Cart"}
          </span>
        </Link>
        <div className="flex-1 flex bg-gray-800 items-center justify-center py-3 space-x-2">
          <span className="text-primary font-medium text-sm sm:text-base">
            ${card.prize}
          </span>
          {card.discount && <CardPrize discount={card.discount} />}
        </div>
      </div>
    </div>
  );
}
