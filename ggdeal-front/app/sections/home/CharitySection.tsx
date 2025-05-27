import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export default function Charity({ style }: { style?: React.CSSProperties }) {


  return (
    <section
      className="bg-[url('/img/charity-bg.png')] bg-cover bg-no-repeat bg-center w-full rounded-lg p-10"
      style={style}
    >
      <div className="pl-10">
        <h2 className="text-2xl font-bold font-epilogue mb-3">
          {t("charity.title")}
        </h2>
        <p className="w-1/2 text-lg font-ekMukta tracking-wide mb-3">
          {t("charity.description")}
        </p>

        <Link to="/charity">
          <button className="mt-4 text-primary font-bold text-xl cursor-pointer">
            {t("charity.learnMore")}
          </button>
        </Link>
      </div>
    </section>
  );
}
