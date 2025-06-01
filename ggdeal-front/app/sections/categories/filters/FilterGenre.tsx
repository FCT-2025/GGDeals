import { useState } from "react";
import type { Genre } from "~/services/GenreService";
import { useTranslation } from "react-i18next";
import FilterCheckBox from "./buttons/FilterCheckBox";

export default function FilterGenre({ genres }: { genres: Array<Genre> }) {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const genresToShow: Array<Genre> = showAll ? genres : genres.slice(0, 5);

  return (
    <>
      {genresToShow.map((genre) => (
        <div key={`${genre.name.toLowerCase()}${genre.id}}`} className="flex items-center">
          <FilterCheckBox idInput={genre.name} name="genre" id={genre.id}/>
          <label htmlFor={`${genre.name}`} className="text-white">
            {`${genre.name} (${genre.gameCount})`}
          </label>
        </div>
      ))}

      {genres.length <= 5 ? (
        ""
      ) : !showAll ? (
        <div className="mt-2">
          <button
            onClick={() => {
              setShowAll(true);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            {t("categories.show.more")}
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <button
            onClick={() => {
              setShowAll(false);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            {t("categories.show.less")}
          </button>
        </div>
      )}
    </>
  );
}
