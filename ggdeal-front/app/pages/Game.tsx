import Breadcrumbs from "~/componets/Breadcrumbs";
import Hero from "~/sections/game/HeroGameSection";
import About from "~/sections/game/AboutSection";
import Settings from "~/sections/game/ControlsSection";
import GameDetail from "~/sections/game/GameDetailSection";
import Rewies from "~/sections/game/ReviewsSection";
import Visual from "~/sections/game/VisualSection";
import type { Route } from "../+types/root";
import { useParams } from "react-router";
import { formatSlugName } from "~/utils/utils";
import { getGameBySlugOrId } from "~/services/GameService";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import type { Game } from "~/types/Game";
import PageError from "./PageError";

export function meta({}: Route.MetaArgs) {
  const { id } = useParams();
  return [
    { title: `GGDeal - ${formatSlugName(id)}` },
    { name: "description", content: "Login in GGdeal" },
  ];
}

export default function Game() {
  const { id } = useParams();
  const location = useLocation();
  const [game, setGame] = useState<Game | null>(null);
  const [errorSearchGame, setErrorSearchGame] = useState(false);

  const fetchGame = async () => {
    if (!id) return;
    const gameSearched = await getGameBySlugOrId(id);
    if (!gameSearched) {
      setErrorSearchGame(true);
      return;
    }
    setGame(gameSearched);
  };

  useEffect(() => {
    fetchGame();
  }, [location.pathname]);

  if(errorSearchGame) {
      return <PageError error={404} />;
  }

  if (game == null) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <Hero game={game} />
      <GameDetail game={game} />
      <Breadcrumbs className="w-full" />
      <About game={game} />
      {game.gameMedias !== null && <Visual game={game} />}
      <Settings />
      <Rewies />
    </>
  );
}
