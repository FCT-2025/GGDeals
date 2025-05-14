import type { Route } from "../routes/+types/home";
import Breadcrumbs from "~/componets/Breadcrumbs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal" },
    { name: "description", content: "Welcome to the best game saler!!" },
  ];
}

export default function Categories() {
  return (
    <div>
      <Breadcrumbs className="py-20" />
      <h1>Categories</h1>
      <p>Explore our categories of games!</p>
    </div>
  );
}
