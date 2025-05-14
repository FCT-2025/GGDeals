import { useEffect, useState } from "react";
import { isRouteErrorResponse } from "react-router";
import type { Route } from "../+types/root";

export default function PageError({ error } : Route.ErrorBoundaryProps | { error: unknown }) {
  const [showStack, setShowStack] = useState(false);

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack = undefined;

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        document.title = "404 - Page Not Found";
      } else {
        document.title = `${error.status} - ${error.statusText}`;
      }
    } else {
      document.title = "Application Error";
    }
  }, [error]);

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const toggleStack = () => {
    setShowStack(!showStack);
  };

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div
          className={`${
            isNotFound ? "bg-primary" : "bg-secondary"
          } p-6 text-center`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
            <span
              className={`text-3xl font-bold font-nouvel ${
                isNotFound ? "text-primary" : "text-secondary"
              }`}
            >
              {isNotFound ? "404" : "⚠️"}
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold font-epilogue">
            {message}
          </h1>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-800 mb-6">{details}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
              onClick={() => (window.location.href = "/")}
            >
              <span className="mr-1">
                <img className="w-6" src="/img/house-solid-white.svg" alt="Home" />
              </span>
              <span>Home</span>
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-black border border-black rounded-md hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => window.history.back()}
            >
              <span className="mr-1">←</span>
              <span>Go Back</span>
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-black border border-black rounded-md hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => window.location.reload()}
            >
              <span className="mr-1">🔄</span>
              <span>Reload</span>
            </button>
          </div>

          {stack && (
            <div className="mt-6 border-t pt-4">
              <button
                className="text-primary hover:text-secondary hover:underline mb-2"
                onClick={toggleStack}
              >
                {showStack
                  ? "Hide technical details"
                  : "Show technical details"}
              </button>

              {showStack && (
                <pre className="w-full p-4 bg-gray-100 rounded-md overflow-x-auto text-left text-sm border border-gray-800">
                  <code className="text-black text-xs">{stack}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
