export default function CardPrimary(card: {
  src: string;
  alt: string;
  description: string;
  prize: string;
  discount?: string;
}) {
  return (
    <div className="relative w-full">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg"
        src={card.src}
        alt={card.alt}
      />
      {card.discount && (
        <div className="absolute top-5 left-0 bg-secondary py-1 px-4 rounded-tr-lg rounded-br-lg">
          <p className="font-karantina text-[36px]">{card.discount}%</p>
        </div>
      )}

      <p className="font-sofia text-lg p-2">{card.description}</p>
      <div className="flex w-full">
        <div className="flex-[1] bg-primary flex space-x-2 items-center justify-center py-2 rounded-bl-lg">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.25 5.5L19.25 15.5H5.25L2.65 2.5H0.25V0.5H5.25L6.25 5.5H21.25ZM7.25 20.5H10.25V17.5H7.25V20.5ZM14.25 20.5H17.25V17.5H14.25V20.5Z"
              fill="#161618"
            />
          </svg>
          <span className="text-black font-nouvel font-bold">Add To Cart</span>
        </div>
        <div className="flex-[1] flex bg-gray-800 space-x-2 items-center justify-center py-2 rounded-br-lg">
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
