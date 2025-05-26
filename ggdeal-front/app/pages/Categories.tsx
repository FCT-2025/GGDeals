import { useState } from "react";
import type { Route } from "../routes/+types/home";
import Breadcrumbs from "~/componets/Breadcrumbs";
import CardPrimary from "~/componets/cards/CardPrimary";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Categories" },
    { name: "description", content: "Browse all game categories on GGDeal" },
  ];
}

export default function Categories() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);

  const games = [
    {
      src: "/img/vistajuego2.png",
      alt: "Grand Theft Auto V",
      discount: 40,
      name: "Grand Theft Auto V",
      description: "PC - Steam Key - GLOBAL",
      prize: 19.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego3.png",
      alt: "Assassin's Creed",
      discount: 30,
      name: "Assassin's Creed X",
      description: "PC - Steam Key - GLOBAL",
      prize: 29.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego4.png",
      alt: "PUBG Battlegrounds",
      discount: 25,
      name: "PUBG Battlegrounds",
      description: "PC - Steam Key - GLOBAL",
      prize: 24.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego5.png",
      alt: "GTA Online",
      discount: 15,
      name: "GTA Online",
      description: "PC - Steam Key - GLOBAL",
      prize: 12.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego6.png",
      alt: "Need for Speed",
      discount: 35,
      name: "Need for Speed",
      description: "PC - Steam Key - GLOBAL",
      prize: 18.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego7.png",
      alt: "God of War",
      discount: 20,
      name: "God of War",
      description: "PC - Steam Key - GLOBAL",
      prize: 39.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego8.png",
      alt: "Black Myth: Wukong",
      discount: 10,
      name: "Black Myth: Wukong",
      description: "PC - Steam Key - GLOBAL",
      prize: 49.99,
      plataforms: ["Steam"]
    },
    {
      src: "/img/vistajuego5.png",
      alt: "Thymesia",
      discount: 45,
      name: "Thymesia",
      description: "PC - Steam Key - GLOBAL",
      prize: 15.99,
      plataforms: ["Steam"]
    },
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "minPrice") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Breadcrumbs className="py-10" />
      
      <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row">
        <aside className="md:w-64 lg:w-72 flex-shrink-0 mb-6 md:mb-0 md:mr-6">
          <div className="md:hidden w-full bg-gray-800 p-4 mb-4 flex justify-between items-center rounded">
            <span className="text-white font-bold">Filters</span>
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>

          <div className="md:block">
            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">Platform</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="ps5" className="mr-2" />
                  <label htmlFor="ps5" className="text-white">PlayStation 5</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="ps4" className="mr-2" />
                  <label htmlFor="ps4" className="text-white">PlayStation 4</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="xbox-series" className="mr-2" />
                  <label htmlFor="xbox-series" className="text-white">Xbox Series X</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="xbox-one" className="mr-2" />
                  <label htmlFor="xbox-one" className="text-white">Xbox One</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="nintendo" className="mr-2" />
                  <label htmlFor="nintendo" className="text-white">Nintendo</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="pc" className="mr-2" />
                  <label htmlFor="pc" className="text-white">PC</label>
                </div>
              </div>
              <div className="mt-2">
                <button className="text-gray-400 hover:text-white text-sm">Show more</button>
              </div>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">Price</h3>
              <div className="flex justify-between mb-2">
                <input 
                  type="number"
                  name="minPrice"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-[45%] bg-gray-700 p-2 text-white rounded"
                  placeholder="min"
                />
                <input 
                  type="number"
                  name="maxPrice"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-[45%] bg-gray-700 p-2 text-white rounded"
                  placeholder="max"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">Genre</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="action" className="mr-2" />
                  <label htmlFor="action" className="text-white">Action (156)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="adventure" className="mr-2" />
                  <label htmlFor="adventure" className="text-white">Adventure (105)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rpg" className="mr-2" />
                  <label htmlFor="rpg" className="text-white">RPG (98)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="shooter" className="mr-2" />
                  <label htmlFor="shooter" className="text-white">Shooter (84)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="puzzle" className="mr-2" />
                  <label htmlFor="puzzle" className="text-white">Puzzle (57)</label>
                </div>
              </div>
              <div className="mt-2">
                <button className="text-gray-400 hover:text-white text-sm">Show more</button>
              </div>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="rating-5" className="mr-2" />
                  <label htmlFor="rating-5" className="text-white flex items-center">
                    <span>★★★★★</span>
                    <span className="ml-2">(5.0)</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-4" className="mr-2" />
                  <label htmlFor="rating-4" className="text-white flex items-center">
                    <span>★★★★☆</span>
                    <span className="ml-2">(4.0+)</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-3" className="mr-2" />
                  <label htmlFor="rating-3" className="text-white flex items-center">
                    <span>★★★☆☆</span>
                    <span className="ml-2">(3.0+)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">DLC Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="all-dlc" name="dlc-type" className="mr-2" defaultChecked />
                  <label htmlFor="all-dlc" className="text-white">All</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="game" name="dlc-type" className="mr-2" />
                  <label htmlFor="game" className="text-white">Game</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="dlc" name="dlc-type" className="mr-2" />
                  <label htmlFor="dlc" className="text-white">DLC</label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-2xl font-bold text-white mb-2 sm:mb-0">All Games</h1>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-white mr-2">Sort by:</label>
              <select id="sort" className="bg-gray-800 text-white p-2 rounded border border-gray-700">
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Release Date</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {games.map((game, index) => (
              <CardPrimary
                key={`game-${index}`}
                className="h-full mb-4"
                src={game.src}
                alt={game.alt}
                name={game.name}
                description={game.description}
                prize={game.prize}
                discount={game.discount}
                plataforms={game.plataforms}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button 
                className="px-3 py-2 rounded border border-gray-700 text-gray-400 hover:bg-gray-800 transition-colors"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {[1, 2, 3, 4, 5].map(page => (
                <button 
                  key={`page-${page}`}
                  className={`px-4 py-2 rounded ${currentPage === page ? 'bg-secondary text-black font-bold' : 'border border-gray-700 text-white hover:bg-gray-800'} transition-colors`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <span className="px-3 py-2 text-gray-400">...</span>
              
              <button 
                className="px-3 py-2 rounded border border-gray-700 text-gray-400 hover:bg-gray-800 transition-colors"
                onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
              >
                Next
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}