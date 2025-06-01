import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Plataform } from "~/services/PlataformService";
import FilterCheckBox from "./buttons/FilterCheckBox";


export default function FilterGenre({
  platforms,
}: {
  platforms: Array<Plataform>;
}) {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const platFormToShow: Array<Plataform> = showAll
    ? platforms
    : platforms.slice(0, 5);

  return (
    <>
      {platFormToShow.map((platform) => (
        <div
          key={`${platform.name}${platform.id}`}
          className="flex items-center"
        >
          <FilterCheckBox idInput={platform.name} name="platformModel" id={platform.id}/>
          <label htmlFor={platform.name} className="text-white">
            {platform.name}
          </label>
        </div>
      ))}

      {platforms.length > 5 && (
        <div className="mt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-gray-400 hover:text-white text-sm"
          >
            {showAll ? t("categories.show.less") : t("categories.show.more")}
          </button>
        </div>
      )}
    </>
  );
}
