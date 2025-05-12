import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("categories", "routes/categories.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("contact", "routes/contact.tsx"),
  route("shoppingcart", "routes/shoppingcart.tsx"),
] satisfies RouteConfig;
