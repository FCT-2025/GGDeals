import { useLocation, Link } from "react-router";
import  { formatSlugName }  from "~/utils/utils";

export default function Breadcrumbs({ className }: { className?: string }) {
  const location = useLocation();

  let currentPath = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentPath += `/${crumb}`;
      return (
        <div key={crumb}>
          &gt; &nbsp;
          <Link className={`${array.length === index + 1 ? "text-primary" : ""}`} to={currentPath}>
            {formatSlugName(crumb)}
          </Link>
        </div>
      );
    });

  return (
    <div className={`breadcrumbs flex gap-2 text-sm font-bold font-nouvel ${className}`}>
      <Link to="/" className="crumb">
        Home
      </Link>
      {crumbs}
    </div>
  );
}


