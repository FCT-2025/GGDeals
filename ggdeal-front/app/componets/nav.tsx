import { NavLink, Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import IconSearch from "../assets/icons/icon-search.svg?react";
import IconCart from "../assets/icons/icon-cart.svg?react";
import IconFavourite from "../assets/icons/icon-favourite.svg?react";
import IconUser from "../assets/icons/icon-user.svg?react";
import IconGGD from "../assets/icons/GGD.svg?react";
import type { User } from "../services/authService";
import { useUser } from "../context/UserContext";
import { Config } from "~/config/config";
import { t } from "i18next";

export default function Nav() {
  const [isHovered, setHover] = useState(false);
  const [onFocus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {user, setUser} = useUser();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get("query") || "";
    setQuery(queryFromUrl);
  }, []);

  // Cerrar menú mobile cuando cambie la ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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

    if (deltaY > 600) {
      setScrolling(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    transition-all duration-300 hover:text-primary relative
    ${isActive ? "text-primary font-bold" : ""}
    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 
    after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "hover:after:w-full"}
  `;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) => `
    block px-4 py-3 text-lg font-medium transition-all duration-300 hover:text-primary hover:bg-gray-100
    ${isActive ? "text-primary bg-gray-50 border-r-4 border-primary" : ""}
  `;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserModal = () => {
    setUserModalOpen(!isUserModalOpen);
  };

  const handleLogout = () => {
    fetch(`${Config.AUTH.LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    navigate("/login");
    setUser(null);

    console.log("Logging out...");
    setUserModalOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between fixed left-1/2 transform top-0 -translate-x-1/2 w-full z-50 pt-10 px-4 lg:px-0">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between">
          <ul className="flex gap-x-8">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                {t("nav.home")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={navLinkClass}>
                {t("nav.categories")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
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
              placeholder={t("placeholders.search")}
              className={`border border-gray-300 rounded-lg py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 ${
                isInputIsEmpty()
                  ? "focus:ring-secondary"
                  : "focus:ring-blue-500"
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
            <Link
              to="/shoppingcart"
              className="flex justify-center items-center"
            >
              <IconCart />
            </Link>

            {user ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  onClick={toggleUserModal}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={user.avatarPath}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full object-cover transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <Link
                  to="/login"
                  className="flex gap-x-2 justify-center items-center"
                >
                  <IconUser />
                  <span>{t("nav.login")}</span>
                </Link>
                <span>|</span>
                <Link to="/register">{t("nav.register")}</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Icons */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to="/shoppingcart" className="flex justify-center items-center">
            <IconCart />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer group"
            aria-label="Toggle mobile menu"
          >
            <span className="block w-6 h-0.5 bg-current mb-1 transition-all duration-300 origin-center group-hover:w-8"></span>
            <span className="block w-6 h-0.5 bg-current mb-1 transition-all duration-300 origin-center group-hover:w-8"></span>
            <span className="block w-6 h-0.5 bg-current mb-1 transition-all duration-300 origin-center group-hover:w-8"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-black shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close menu"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={query}
                placeholder={t("placeholders.search")}
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isInputIsEmpty()) {
                    searchGame(query);
                  }
                }}
              />
              <button
                onClick={handleSearchClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <IconSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <ul className="py-4">
              <li>
                <NavLink to="/" end className={mobileNavLinkClass}>
                  {t("nav.home")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={mobileNavLinkClass}>
                  {t("nav.categories")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={mobileNavLinkClass}>
                  {t("nav.contact")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 p-6">
            {user ? (
              <button
                onClick={toggleUserModal}
                className="flex items-center space-x-4 w-full text-left group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <img
                  src={user.avatarPath}
                  alt="Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-700">{t("nav.welcome")}</p>
                  <p className="text-sm text-gray-400">{t("nav.profile")}</p>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <IconUser className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* User Profile Modal */}
      {user && (
        <>
          {/* Modal Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
              isUserModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setUserModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-2xl shadow-2xl z-50 w-96 max-w-[90vw] transition-all duration-300 ${
              isUserModalOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t("nav.userProfile.title")}</h3>
                <button
                  onClick={() => setUserModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <span className="text-xl text-white">&times;</span>
                </button>
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={user.avatarPath}
                    alt="Avatar"
                    className="h-20 w-20 rounded-full object-cover "
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <h4 className="text-lg font-semibold mb-1">
                  {user.username || "User"}
                </h4>
                <p className="text-sm mb-4">
                  {user.email || "user@example.com"}
                </p>
              </div>

              {/* Menu Options */}
              <div className="space-y-2 mb-6">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setUserModalOpen(false)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <IconUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{t("nav.userProfile.see")}</span>
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setUserModalOpen(false)}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">My Orders</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setUserModalOpen(false)}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <IconFavourite className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">Wishlist</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setUserModalOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <span className="text-red-600 font-medium">{t("user.userProfile.logout")}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
