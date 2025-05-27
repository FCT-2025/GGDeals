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


export function meta({}: Route.MetaArgs) {
  const  { slug } = useParams();
  return [
    { title: `GGDeal - ${formatSlugName(slug)}` },
    { name: "description", content: "Login in GGdeal" },
  ];
}
 

export default function Game() {
  const  { slug } = useParams();
  return (
    <>
      <Hero />
      <GameDetail />
      <Breadcrumbs className="w-full"/>
      <About />
      <Visual />
      <Settings />
      <Rewies />
    </>
  );
}
