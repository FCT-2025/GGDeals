import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Config } from "~/config/config";
import type { RefObject } from "react";

export default function ControlPanel({
  walletBalance,
  setWalletBalance,
  childMethodRefReloadError,
}: {
  walletBalance: number | null;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  childMethodRefReloadError: RefObject<Array<() => void>>;
}) {
  const { t } = useTranslation();
  const [onErrorWallet, setOnErrorWallet] = useState<string | null>(null);

  const getBalance = async () => {
    try {
      const response = await fetch(Config.USER.WALLET, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setWalletBalance(parseFloat(data.amount));
      } else {
        setOnErrorWallet(data.message);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
      alert(t("profile.wallet.topUpError"));
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const reloadError: () => void = () => {
    if (onErrorWallet) setOnErrorWallet(null);
  };

  childMethodRefReloadError.current.push(reloadError);

  return (
    <div className="w-full max-w-4xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 p-4">
          <h3 className="text-center text-gray-300 mb-4">
            {t("profile.generalView.title")}
          </h3>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">
                {t("profile.generalView.friends")}
              </span>
              <span className="text-white font-bold text-xl">0</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">
                {t("profile.generalView.reviews")}
              </span>
              <span className="text-white font-bold text-xl">0</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">
                {t("profile.generalView.wishlist")}
              </span>
              <span className="text-white font-bold text-xl">0</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4">
          <h3 className="text-center text-gray-300 mb-4">
            {t("profile.wallet.title")}
          </h3>
          <div className="flex relative justify-center items-center h-12">
            <span className="text-gray-400">
              {t("profile.wallet.affiliation")}:
            </span>
            <span className="text-white font-bold text-xl ml-2">
              {walletBalance}€
            </span>
            {onErrorWallet && (
              <small className="absolute  bottom-[-55%] text-sm w-full text-center mb-4 text-red-500">
                {onErrorWallet}
              </small>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4">
          <h3 className="text-center text-gray-300 mb-4">
            {t("profile.ranking.title")}
          </h3>
          <div className="flex justify-center items-center h-12">
            <span className="text-gray-400">{t("profile.ranking.level")}:</span>
            <span className="text-white font-bold text-xl ml-2">1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4">
          <h3 className="text-center text-gray-300 mb-2">
            {t("profile.affiliation.title")}
          </h3>
          <p className="text-center text-sm text-gray-400">
            {t("profile.affiliation.description")}
          </p>
        </div>

        <div className="bg-gray-800 p-4">
          <h3 className="text-center text-gray-300 mb-2">
            {t("profile.totalSaved.title")}
          </h3>
          <div className="flex justify-center items-center h-12">
            <span className="text-white font-bold text-xl">0€</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 mb-8">
        <h3 className="text-center text-gray-300 mb-6">
          {t("profile.wishlist.latestGames")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden mb-2">
              <img
                src="/img/vistajuego2.png"
                alt="Death Stranding"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-white text-sm font-medium text-center">
              DEATH STRANDING
            </h4>
          </div>
          <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden mb-2">
              <img
                src="/img/vistajuego2.png"
                alt="Death Stranding"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-white text-sm font-medium text-center">
              DEATH STRANDING
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
