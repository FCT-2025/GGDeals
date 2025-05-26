import CardPrize from "./cardsComponents/CardPrize";
import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";
import IconCardBlack from "../../assets/icons/icon-cart-black.svg?react";

export default function CardPrimary(card: CardsProps) {
  return (
    <div className={`flex flex-col bg-black rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-[1.02] ${card.className}`}>
      <div className="relative w-full pt-[75%]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src={card.src}
          alt={card.alt}
        />
        {card.discount && <CardDiscountBadge discount={card.discount} />}
      </div>
      
      <div className="flex-grow p-3 flex flex-col">
        <p className="font-sofia text-base sm:text-lg text-white mb-2 line-clamp-2 h-12">
          {card.description}
        </p>
        
        {card.plataforms && card.plataforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto mb-2">
            {card.plataforms.map((platform, idx) => (
              <span 
                key={`platform-${idx}`} 
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {platform}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex w-full mt-auto">
        <button className="flex-1 bg-primary hover:bg-primary/90 flex items-center justify-center py-3 space-x-2 transition-colors">
          <IconCardBlack className="w-5 h-5" />
          <span className="text-black font-nouvel font-bold text-sm sm:text-base whitespace-nowrap">Add To Cart</span>
        </button>
        <div className="flex-1 flex bg-gray-800 items-center justify-center py-3 space-x-2">
          <span className="text-primary font-medium text-sm sm:text-base">${card.prize}</span>
          {card.discount && <CardPrize discount={card.discount} />}
        </div>
      </div>
    </div>
  );
}