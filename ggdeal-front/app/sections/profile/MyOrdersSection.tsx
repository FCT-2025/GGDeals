import { useTranslation } from "react-i18next";
export default function MyOrders() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-4xl px-4">
      <div className="bg-gray-800 p-6 text-center">
        <h3 className="text-xl text-gray-300">{t("profile.orders.title")}</h3>
        <p className="text-gray-400 mt-4">{t("profile.orders.noOrders")}</p>
      </div>
    </div>
  );
}
