import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),
  route("categories", "pages/Categories.tsx"),
  route("login", "pages/Login.tsx"),
  route("register", "pages/Register.tsx"),
  route("contact", "pages/Contact.tsx"),
  route("shoppingcart", "pages/Shoppingcart.tsx"),
<<<<<<< HEAD
  route("interfazuser", "pages/InterfazUser.tsx"),
  route("game/:id", "pages/Game.tsx"),
=======
  route("game/:slug", "pages/Game.tsx"),
>>>>>>> 7b50969d3b1f5c74ac04eb5d9176adcb88ec47a7
] satisfies RouteConfig;
