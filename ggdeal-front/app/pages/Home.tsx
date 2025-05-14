import type { Route } from "../+types/root";
import Hero from "../sections/home/Hero";
import Charity from "~/sections/home/Charity";
import GameShowcase from "~/sections/home/GameShowcase";
import CompanyGames from "~/sections/home/CompanyGames";
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
      <Breadcrumbs className="py-10"/>
      <GameShowcase />
      <Charity />
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


