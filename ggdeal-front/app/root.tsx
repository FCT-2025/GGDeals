import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useEffect, useState, useRef } from "react";
import { getUsuario } from "./services/authService";
import type { User } from "./services/authService";
import { UserProvider } from "./context/UserContext";
import type { Route } from "./+types/root";
import "./app.css";
import Nav from "./componets/Nav";
import Footer from "./componets/Footer";
import PageError from "./pages/PageError";
import "./i18n";
import { useTranslation } from "react-i18next";
import { LanguageProvider } from "./context/LanguageContext";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Karantina:wght@400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Karantina:wght@400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <LanguageProvider i18nInstance={i18n}>
      <UserProvider>
        <html lang={i18n.language} className="scroll-smooth">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
          </head>
          <body className="relative">
            <Nav />
            {children}
            <ScrollRestoration />
            <Scripts />
            <Footer />
          </body>
        </html>
      </UserProvider>
    </LanguageProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <PageError error={error} />;
}
