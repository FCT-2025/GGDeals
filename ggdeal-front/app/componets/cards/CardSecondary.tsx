import type { Game } from "~/types/Game";
import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";
import CardPrize from "./cardsComponents/CardPrize";
import type { Plataform } from "~/services/PlataformService";
import { Link } from "react-router";

export default function CardSecondary({
  card,
  className,
}: {
  card: Game;
  className: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <CardDiscountBadge discount={card.discount} />
      <div className="relative border-1 w-full">
        <img
          src={card.src ?? ""}
          alt="Game"
          className="w-full object-cover h-[300px]"
        />
        <div className="absolute bottom-0 w-full bg-[rgba(0,0,0,0.7)] p-2">
          <p className="text-center text-sm sm:text-base text-white">
            {card.title}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        {card.platformModels &&
          card.platformModels.slice(0, 2).map((plataform: Plataform, index) => (
            <div
              key={`card-plataform${index}`}
              className="flex justify-center items-center p-2 border-1 border-t-0 rounded-bl-lg rounded-br-lg"
            >
              <img src={plataform.pathLogo} alt={plataform.name} />
            </div>
          ))}

        <Link
          className="flex justify-center items-center space-x-2 p-1 border-1 border-t-0 rounded-bl-lg rounded-br-lg cursor-pointer"
          to={`/game/${card.nameSlug}`}
        >
          <img src="/img/cart-white.png" alt="Cart" />
          <span className="text-xs">Add To Cart</span>
        </Link>

        <div className="flex justify-center items-center space-x-2 p-1">
          <span className="text-primary">{card.prize}$</span>
          <CardPrize discount={card.discount} />
        </div>
      </div>
    </div>
  );
}
