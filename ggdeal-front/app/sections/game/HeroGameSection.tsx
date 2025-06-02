import type { Game } from "~/types/Game";

export default function Hero({ game }: { game: Game }) {

  const thumbnailPath = game.gameMedias.find((gameMedia) => {
    return gameMedia.isThumbnail;
  });

  return (
    <div className="w-full h-[600px] relative">
      <img
        src={thumbnailPath?.path ? thumbnailPath.path : "/img/vistajuego1.png"}
        alt="Death Stranding Hero"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

