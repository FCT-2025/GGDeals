import { NavLink, Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import IconSearch from "../assets/icons/icon-search.svg?react";
import IconCart from "../assets/icons/icon-cart.svg?react";
import IconFavourite from "../assets/icons/icon-favourite.svg?react";
import IconUser from "../assets/icons/icon-user.svg?react";
import IconGGD from "../assets/icons/GGD.svg?react";

export default function Nav() {
  const [isHovered, setHover] = useState(false);
  const [onFocus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolling, setScrolling] = useState(false);
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

  let lastScrollY = useRef(0);

  const handleScroll = () => {
    console.log(lastScrollY.current + " " + window.scrollY);
    const deltaY = Math.abs(window.scrollY - lastScrollY.current);

    if (deltaY > 600 ) {
      setScrolling(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  return (
    <header className="flex items-center justify-between sticky top-0 w-full z-10 pt-10 z-100">
      <Link to="/">
        <div className="group relative flex items-center justify-center">
          <IconGGD className="z-50" />
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
             animate-neon-glow pointer-events-none transform scale-130 transition-all duration-300"
          ></div>
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
             animate-neon-glow-inset pointer-events-none transform scale-130 transition-all duration-300"
          ></div>
        </div>
      </Link>
      <nav className="flex items-center justify-between">
        <ul className="flex gap-x-8">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `
              }
            >
              Upcoming Games
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-releases"
              className={({ isActive }) =>
                `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `
              }
            >
              New Release
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/game/death-stranding"
              className={({ isActive }) =>
                `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `
              }
            >
              Game Demo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `
              trasition-all duration-300 hover:text-primary
              ${
                isActive
                  ? "text-primary font-bold underline underline-offset-3"
                  : ""
              }
              `}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div
          className="flex items-center px-10 space-x-4"
          onMouseEnter={() => {
            setHover(true);
            setScrolling(false);
            lastScrollY.current = window.scrollY;
            window.addEventListener("scroll", handleScroll);
          }}
          onMouseLeave={() => setHover(false)}
        >
          <IconSearch
            className={`cursor-pointer object-contain transition-all duration-300 ${
              isHovered ? "scale-120" : ""
            }`}
            alt="Search Sale"
            onClick={handleSearchClick}
          />

          <input
            type="text"
            ref={inputRef}
            value={query}
            placeholder="Search for games..."
            className={`border border-gray-300 rounded-lg py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 ${
              isInputIsEmpty() ? "focus:ring-secondary" : "focus:ring-blue-500"
            } ${
              (isHovered || onFocus || !isInputIsEmpty()) && !isScrolling
                ? "w-60 opacity-100"
                : "w-0 opacity-0"
            }`}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isInputIsEmpty()) {
                searchGame(query);
              }
            }}
          />
        </div>

        <div className="flex gap-x-5">
          <Link to="/shoppingcart" className="flex justify-center items-center">
            <IconCart />
          </Link>
          <Link to="/favourite" className="flex justify-center items-center">
            <IconFavourite />
          </Link>

          <div className="flex items-center gap-x-2">
            <Link
              to="/login"
              className="flex gap-x-2 justify-center items-center"
            >
              <IconUser />
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
