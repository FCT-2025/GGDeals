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
      <GameShowcase className="mt-8 sm:mt-10 md:mt-15 px-4 sm:px-6 md:px-8" />
      <Charity className="mb-12 sm:mb-20 md:mb-32 lg:mb-40 xl:mb-[160px] px-4 sm:px-6 md:px-8" />
      <CompanyGames
        companyName="BANDAI NANCOT Entreteniments games"
        isMain={true}
        className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6 md:px-8"
      />
      <CompanyGames
        companyName="Steam"
        isMain={false}
        className="mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8"
      />
      <CompanyGames
        companyName="Epic"
        isMain={false}
        className="mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8"
      />
    </>
  );
}


