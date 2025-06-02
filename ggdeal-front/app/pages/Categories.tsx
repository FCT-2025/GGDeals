import { useState, useEffect } from "react";
import type { Route } from "../+types/root";
import Breadcrumbs from "~/componets/Breadcrumbs";
import CardPrimary from "~/componets/cards/CardPrimary";
import type { PaginationGame } from "~/types/PaginationGame";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { getPlataforms, type Plataform } from "~/services/PlataformService";
import { type Genre, getGenres } from "~/services/GenreService";
import FilterGenre from "~/sections/categories/filters/FilterGenre";
import FilterPlatform from "~/sections/categories/filters/FilterPlatform";
import Pagination from "~/sections/categories/Pagination";
import { getPageGames } from "~/services/GameService";
import { TypeGame } from "~/types/Game";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Categories" },
    { name: "description", content: "Browse all game categories on GGDeal" },
  ];
}

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [pageGamesList, setGamePageListing] = useState<PaginationGame | null>(
    null
  );
  const [sizePagination, setSizePagination] = useState<number | null>(null);
  const [plataformsList, setPlataformsList] = useState<Array<Plataform>>([]);
  const [genreList, setGenreList] = useState<Array<Genre>>([]);
  const [sortBy, setSortBy] = useState('bestSelling');

  const fetchGames = async () => {
    const pageGames = await getPageGames(location.search);
    setGamePageListing(pageGames);
  };

  useEffect(() => {
    const fetchPlataforms = async () => {
      const platforms = await getPlataforms(location.search);
      setPlataformsList(platforms);
    };

    const fetchGenres = async () => {
      const genres = await getGenres(location.search);
      setGenreList(genres);
    };

    // Initialize price range from URL params
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }

    // Initialize sort from URL params
    const sortParam = searchParams.get('sortBy');
    if (sortParam) {
      setSortBy(sortParam);
    }

    fetchGames();
    fetchPlataforms();
    fetchGenres();
  }, [location.search]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "minPrice") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleApplyPriceFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (priceRange[0] > 0) {
      newSearchParams.set('minPrice', priceRange[0].toString());
    } else {
      newSearchParams.delete('minPrice');
    }
    
    if (priceRange[1] < 200) {
      newSearchParams.set('maxPrice', priceRange[1].toString());
    } else {
      newSearchParams.delete('maxPrice');
    }

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 200]);
    setSortBy('bestSelling');
    navigate('', { replace: true });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSortBy !== 'bestSelling') {
      newSearchParams.set('sortBy', newSortBy);
    } else {
      newSearchParams.delete('sortBy');
    }
    
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <section className="min-h-screen bg-black mt-35">
      <Breadcrumbs className="py-10" />

      <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row">
        <aside className="md:w-64 lg:w-72 flex-shrink-0 mb-6 md:mb-0 md:mr-6">
          <div className="md:hidden w-full bg-gray-800 p-4 mb-4 flex justify-between items-center rounded">
            <span className="text-white font-bold">{t('categories.filters')}</span>
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>

          <div className="md:block">
            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">{t('categories.platform')}</h3>
              <div className="space-y-2">
                <FilterPlatform platforms={plataformsList} />
              </div>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">{t('categories.price')}</h3>
              <div className="flex justify-between mb-2">
                <input
                  type="number"
                  name="minPrice"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-[45%] bg-gray-700 p-2 text-white rounded"
                  placeholder={t('categories.minPrice')}
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-[45%] bg-gray-700 p-2 text-white rounded"
                  placeholder={t('categories.maxPrice')}
                />
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full mb-3"
              />
              <button
                onClick={handleApplyPriceFilter}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                {t('categories.applyPriceFilter')}
              </button>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">{t('categories.genre')}</h3>
              <div className="space-y-2">
                <FilterGenre genres={genreList} />
              </div>
            </div>

            <div className="bg-gray-800 p-4 mb-4 rounded">
              <h3 className="text-white font-bold mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="rating-5" className="mr-2" />
                  <label
                    htmlFor="rating-5"
                    className="text-white flex items-center"
                  >
                    <span>★★★★★</span>
                    <span className="ml-2">(5.0)</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-4" className="mr-2" />
                  <label
                    htmlFor="rating-4"
                    className="text-white flex items-center"
                  >
                    <span>★★★★☆</span>
                    <span className="ml-2">(4.0+)</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-3" className="mr-2" />
                  <label
                    htmlFor="rating-3"
                    className="text-white flex items-center"
                  >
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
                  <input
                    type="radio"
                    id="all-dlc"
                    name="dlc-type"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="all-dlc" className="text-white">
                    All
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="game"
                    name="dlc-type"
                    className="mr-2"
                  />
                  <label htmlFor="game" className="text-white">
                    Game
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="dlc"
                    name="dlc-type"
                    className="mr-2"
                  />
                  <label htmlFor="dlc" className="text-white">
                    DLC
                  </label>
                </div>
              </div>
            </div>

            {/* Clear All Filters */}
            <div>
              <button
                onClick={handleClearFilters}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {t('categories.clearFilters')}
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-2xl font-bold text-white mb-2 sm:mb-0">
              {t('categories.allGames')}
            </h1>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-white mr-2">
                {t('categories.sortBy')}:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
              >
                <option value="bestSelling">{t('categories.bestSelling')}</option>
                <option value="priceLowToHigh">{t('categories.priceLowToHigh')}</option>
                <option value="priceHighToLow">{t('categories.priceHighToLow')}</option>
                <option value="releaseDate">{t('categories.releaseDate')}</option>
                <option value="popularity">{t('categories.popularity')}</option>
                <option value="nameAZ">{t('categories.nameAZ')}</option>
                <option value="nameZA">{t('categories.nameZA')}</option>
                <option value="ratingHighToLow">{t('categories.ratingHighToLow')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {pageGamesList?.content.map((game) => (
              <CardPrimary
                id={game.id}
                type={game.type}
                nameSlug={game.nameSlug}
                src={game.src}
                alt={game.title}
                className="w-full h-full mb-4"
                discount={game.discount}
                title={game.title}
                prize={game.prize}
                plataforms={game.platformModels}
                key={`${game.title}-${game.id}`}
              />
            ))}
          </div>

          <Pagination pageGamesList={pageGamesList} />
        </main>
      </div>
    </section>
  );
}