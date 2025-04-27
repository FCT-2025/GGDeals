import type { Route } from "./+types/home";
import Hero from "~/pages/home/hero";
import Charity from "~/pages/home/charity";

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
      <Charity />
    </>
    
  );
}
