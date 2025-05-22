export default function formatSlugName(crumb: string | undefined) {
  if (crumb === undefined) return "";
  return crumb
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}