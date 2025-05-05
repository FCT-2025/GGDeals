export default function CardSecondary(card: {
  src: string;
  alt: string;
  discount: number;
  name: string;
  edition?: string;
  prize: number;
  plataforms?: React.ReactNode[];
}) {
  return (
    <div className="relative">
      {card.discount && (
        <div className="absolute top-5 left-0 bg-secondary py-1 px-4 rounded-tr-lg rounded-br-lg">
          <p className="font-karantina text-[36px]">{card.discount}%</p>
        </div>
      )}
      <div className="relative border-1">
        <img src={card.src} alt="Game" />
        <div className="absolute bottom-0 w-full bg-[rgba(0,0,0,0.5)]">
          <p className="text-center">
            {card.name} - {card.edition}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        {card.plataforms &&
          card.plataforms.map((plataform, index) => (
            <div className="flex justify-center items-center p-2 border-1 rounded-bl-lg rounded-br-lg">
              {plataform}
            </div>
          ))}
        <div className="flex justify-center items-center space-x-2 p-1 border-1 rounded-bl-lg rounded-br-lg cursor-pointer">
          <img src="/img/cart-white.png" alt="Cart" />
          <span>Add To Cart</span>
        </div>
        <div className="flex justify-center items-center space-x-2 p-1">
          <span className="text-primary">{card.prize}$</span>
          {card.discount && (
            <span className="text-sm relative">
              {card.discount}$
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100"></div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
