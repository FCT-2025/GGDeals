import CardDiscountBadge from "./cardsComponents/CardDiscountBadge";

export default function CardSecondary(card: CardsProps) {
  return (
    <div className={`flex flex-col bg-black rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-[1.02] ${card.className}`}>
      <div className="relative w-full pt-[85%]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src={card.src}
          alt={card.alt || card.name}
        />
        {card.discount && <CardDiscountBadge discount={card.discount} />}
        
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent py-4 px-4">
          <div className="flex-1">
            <p className="text-white font-medium text-base sm:text-lg md:text-xl lg:text-2xl font-sofia truncate">
              {card.name}
            </p>
            {card.edition && (
              <p className="text-gray-300 text-sm truncate mt-1">
                {card.edition}
              </p>
            )}
          </div>
          
          {card.plataforms && card.plataforms.length > 0 && (
            <div className="flex gap-2 mt-3">
              {card.plataforms.map((platform, idx) => (
                <span key={`platform-${idx}`} className="w-6 h-6">
                  {platform}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
            <div className="flex items-center">
              {card.discount && (
                <span className="bg-secondary text-black font-bold text-sm sm:text-base px-3 py-1 rounded mr-2">
                  -{card.discount}%
                </span>
              )}
            </div>
            <div className="flex items-center">
              {card.discount && (
                <span className="text-gray-400 text-sm sm:text-base line-through mr-2">
                  ${(card.prize / (1 - card.discount / 100)).toFixed(2)}
                </span>
              )}
              <span className="text-primary font-bold text-base sm:text-lg md:text-xl">
                ${card.prize}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}