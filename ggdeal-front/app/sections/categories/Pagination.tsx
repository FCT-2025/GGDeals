import { useState } from "react";
import type { PaginationGame } from "~/types/PaginationGame";
import { useSearchParams, useNavigate } from "react-router";

export default function Pagination({
  pageGamesList,
}: {
  pageGamesList: PaginationGame | null;
}) {
  if (pageGamesList == null) return;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    searchParam.set("page", `${page}`);
    navigate(`?${searchParam.toString()}`);
  };

  const pages = Array.from(
    { length: pageGamesList.totalPages },
    (_, i) => i + 1
  );
  return (
    <div className="mt-16 flex justify-center">
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-2 rounded border border-gray-700 text-gray-400  transition-colors ${
            !pageGamesList.first && "hover:bg-gray-800"
          }`}
          onClick={() => {
            if (pageGamesList.first) return;
            goToPage(currentPage - 1);
          }}
          disabled={pageGamesList.first}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={`page-${page}`}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === page
                ? "bg-secondary text-black font-bold"
                : "border border-gray-700 text-white hover:bg-gray-800"
            }`}
            onClick={() => {
              if (currentPage == page) return;
              goToPage(page);
            }}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-3 py-2 rounded border border-gray-700 text-gray-400  transition-colors ${
            !pageGamesList.last && "hover:bg-gray-800"
          }`}
          onClick={() => {
            if (pageGamesList.last) return;
            goToPage(currentPage + 1);
          }}
          disabled={!pageGamesList.last}
        >
          Next
        </button>
      </div>
    </div>
  );
}
