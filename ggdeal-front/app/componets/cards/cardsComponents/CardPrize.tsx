export default function CardPrize({ discount }: { discount: number | undefined |  null }) {
  return (
    discount && (
      <span className="text-sm relative">
        {discount}$
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100"></div>
      </span>
    )
  );
}
