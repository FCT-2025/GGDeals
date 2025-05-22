import type { Route } from "../+types/root";
import Hero from "../sections/home/HeroHomeSection";
import Charity from "~/sections/home/CharitySection";
import GameShowcase from "~/sections/home/GameShowcaseSection";
import CompanyGames from "~/sections/home/CompanyGamesSection";
import Breadcrumbs from "~/componets/Breadcrumbs";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal" },
    { name: "description", content: "Welcome to the best game saler!!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <GameShowcase className="mt-15"/>
      <Charity style={{marginBottom: "160px"}}/>
      <CompanyGames
        companyName="BANDAI NANCOT Entreteniments games"
        isMain={true}
      />
      <CompanyGames
        companyName="Steam"
        isMain={false}
      />
      <CompanyGames
        companyName="Epic"
        isMain={false}
      />
    </>
  );
}


