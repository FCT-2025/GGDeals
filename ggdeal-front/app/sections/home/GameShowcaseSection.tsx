import type { ReactNode } from "react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import CardSecondary from "~/componets/cards/CardSecondary";
import IconConsole from "../../assets/icons/icon-console.svg?react";
import IconPCMobile from "../../assets/icons/icon-pc-mobile.svg?react";
import {
  getPlataformsByTypeId,
  type Plataform,
} from "~/services/PlataformService";
import { getPageGames } from "~/services/GameService";
import type { PaginationGame } from "~/types/PaginationGame";
import type { Game } from "~/types/Game";

export default function GameShowcase({ className }: { className?: string }) {
  const [currentCategorieIndex, setCategorieIndex] = useState(0);
  const [platformListing, setPlatformListing] = useState<Array<Plataform>>([]);
  const [gameListing, setGameListing] = useState<PaginationGame | null>(null);

  const fetchPlatform = async (id: number) => {
    const platform = await getPlataformsByTypeId(id);
    setPlatformListing(platform);
  };

  const fetchGame = async (id: string) => {
    const pageGame = await getPageGames(id);
    setGameListing(pageGame);
  };

  useEffect(() => {
    fetchPlatform(1);
    fetchGame('?platformType=1');
  }, []);

  return (
    <section className={className}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h3 className="font-epilogue text-xl sm:text-2xl font-light text-gray-100">
          Newest physical listings
        </h3>
        <Link to="/categories">
          <button className="px-3 py-2 bg-primary text-black text-sm font-bold rounded-lg cursor-pointer w-full sm:w-auto">
            Show All
          </button>
        </Link>
      </div>

      {/* Categories Section */}
      <div className="flex flex-wrap gap-2 sm:gap-0 mb-4 sm:mb-0">
        {CategoriesLisitng.map(
          (category: { name: string; icon: ReactNode }, index: number) => (
            <div
              key={`category${index}`}
              className={`flex items-center justify-center py-4 px-3 sm:px-6 transition-all duration-300 cursor-pointer rounded-lg sm:rounded-none flex-1 sm:flex-initial ${
                currentCategorieIndex === index
                  ? "bg-gray-800"
                  : "bg-gray-900 sm:bg-transparent"
              }`}
              onClick={(event) => {
                event.preventDefault();
                setCategorieIndex(index);
                fetchGame(`?platformType=${index + 1}`);
                fetchPlatform(index + 1);
              }}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                {category.icon}
              </div>
              <p className="ml-2 text-sm sm:text-base whitespace-nowrap">
                {category.name}
              </p>
            </div>
          )
        )}
      </div>

      {/* Platform Section */}
      <div className="flex bg-gray-800 overflow-x-auto sm:overflow-x-visible gap-4 sm:gap-0 sm:space-x-15 p-2 sm:p-0 rounded-lg sm:rounded-none">
        {platformListing.map((plataform, index: number) => (
          <div
            className="flex flex-col items-center justify-center py-2 px-3 sm:pl-3.5 flex-shrink-0"
            key={`plataform${index}`}
          >
            <div className="p-2">
              <img
                className="w-full h-full"
                src={plataform.src}
                alt={plataform.name}
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm whitespace-nowrap">
              ({plataform.count} items)
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row w-full mt-7 gap-4">
        {/* Featured Image */}
        <div className="w-full lg:flex-1">
          <img
            src="/img/gameshowcase-feature.png"
            className="w-full h-64 sm:h-80 lg:h-full object-cover object-center rounded-lg"
            alt="Feature image"
          />
        </div>

        {/* Cards Grid - Ahora con altura uniforme */}
        <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
          {gameListing?.content.map((game: Game, index) => (
            <CardSecondary
              className="w-full h-[500px]"
              key={`game${index}`}
              card={game}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const CategoriesLisitng = [
  {
    name: "PC",
    icon: <IconPCMobile />,
  },
  {
    name: "Consoles",
    icon: <IconConsole />,
  },
];