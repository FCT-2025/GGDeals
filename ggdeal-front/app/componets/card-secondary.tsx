export default function CardSecondary(card: { discount: number; src: string }) {
  return (
    <div className="border-1 border-white">
      <div className="absolute top-10 left-0 flex items-center justify-center rounded-r-lg">
        {card.discount}
      </div>
      <img src={card.src} alt="Game" />
      <div></div>
    </div>
  );
}
