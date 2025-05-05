import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal" },
    { name: "description", content: "Welcome to the best game saler!!" },
  ];
}

export default function Categories() {
    return (
        <div>
        <h1>Categories</h1>
        <p>Explore our categories of games!</p>
        </div>
    );
}