import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function Nav() {
  const [isHovered, setHover] = useState(false);
  const [onFocus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get("query") || "";
    setQuery(queryFromUrl);
  }, []);

  const handleSearchClick = () => {
    if (query.trim() === "") {
      inputRef.current?.focus();
    } else {
      searchGame(query);
    }
  };

  const searchGame = (input: string) => {
    navigate(`/search?query=${input}`);
  };

  const isInputIsEmpty = () => {
    return query.trim() === "";
  };

  return (
    <header className="flex items-center justify-between sticky top-0 w-full max-w-[1440px] mx-auto z-10 pt-10 px-4">
      <Link to="/">
        <div className="flex items-center justify-center">
          <img src="/img/GGD.svg" alt="Logo GGDEAL" />
        </div>
      </Link>
      <nav className="flex items-center justify-between">
        <ul className="flex gap-x-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming Games</Link>
          </li>
          <li>
            <Link to="/new-releases">New Release</Link>
          </li>
        </ul>

        <div
          className="flex items-center px-10 space-x-4"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img
            className={`cursor-pointer object-contain transition-all duration-300 ${
              isHovered ? "scale-120" : ""
            }`}
            src="/img/search.png"
            alt="Search Sale"
            onClick={handleSearchClick}
          />
          <input
            type="text"
            ref={inputRef}
            value={query}
            placeholder="Search for games..."
            className={`border border-gray-300 rounded-lg py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isHovered || onFocus || !isInputIsEmpty()
                ? "w-60 opacity-100"
                : "w-0 opacity-0"
            }`}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isInputIsEmpty()) {
                searchGame(query);
              }
            }}
          />
        </div>

        <div className="flex gap-x-5">
          <Link to="/cart">
            <img src="/img/cart.png" alt="Cart's Sale" />
          </Link>
          <Link to="/favourite">
            <img src="/img/favourite.png" alt="Favourite Sale" />
          </Link>

          <div className="flex gap-x-2">
            <Link to="/login" className="flex gap-x-2">
              <img src="/img/user.png" alt="Logo User" />
              <span>Login</span>
            </Link>
            <span>|</span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
