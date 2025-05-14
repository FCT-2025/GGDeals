export default function CardDiscountBadge({ discount }: { discount: number | undefined }) {
  return (
    discount && (
      <div className="absolute top-5 left-0 bg-secondary py-1 px-4 rounded-tr-lg rounded-br-lg z-10">
        <p className="font-karantina text-[36px]">{discount}%</p>
      </div>
    )
  );
}
