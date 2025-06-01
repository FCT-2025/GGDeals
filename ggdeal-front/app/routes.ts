import { type RouteConfig, index, route,  } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),
  route("categories", "pages/Categories.tsx"),
  route("login", "pages/Login.tsx"),
  route("register", "pages/Register.tsx"),
  route("contact", "pages/Contact.tsx"),
  route("shoppingcart", "pages/Shoppingcart.tsx"),
  route("profile", "pages/Profile.tsx"),
  route("game/:id", "pages/Game.tsx"),
] satisfies RouteConfig;
