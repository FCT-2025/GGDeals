import { useSearchParams, useNavigate } from "react-router";

export function formatSlugName(crumb: string | undefined) {
  if (crumb === undefined) return "";
  return crumb
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function joinUrl(...parts: string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/, "");
      } else {
        return part.replace(/^\/+|\/+$/g, "");
      }
    })
    .join("/");
}

