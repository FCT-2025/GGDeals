import type { Route } from "../+types/root";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "~/context/UserContext";
import SettingsProfileSection from "~/sections/profile/SettingsProfileSection";
import ControlPanel from "~/sections/profile/ControlPanelSection";
import LanguageCurrencySection from "~/sections/profile/LanguageCurrencySection";
import MyOrders from "~/sections/profile/MyOrdersSection";
import WalletSection from "~/sections/profile/WalletSection";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Profile" },
    {
      name: "description",
      content:
        "Welcome to the Profile here you have all of you need to set your settings",
    },
  ];
}

export default function UserInterface() {
  const { t } = useTranslation();
  const validTabs: Array<string> = [
    "myOrders",
    "settings",
    "wallet",
    "languageCurrency",
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("");
  useEffect(() => {
    setActiveTab(location.hash.slice(1));
  }, [location]);

  const [walletBalance, setWalletBalance] = useState<number>(0);
  const childMethodRefReloadError = useRef<Array<() => void>>([]);
  const callReloadError = () => {
    childMethodRefReloadError.current.forEach((reloadError) => {
      reloadError();
    });
  };

  const handleActivateTab = (tab: string) => {
    callReloadError();
    setActiveTab(tab);
    if (tab !== "") {
      tab = "#" + tab;
    }
    navigate("/profile" + tab);
  };

  const { user } = useUser();
  return (
    <section className="flex flex-col items-center min-h-screen w-full bg-black mt-35">
      <div className="flex flex-col items-center py-8">
        <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-4">
          <img
            src={user?.avatarPath ? user.avatarPath : "/img/user.png"}
            alt={t("profile.userProfile")}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">
          {user ? user.username : "username"}
        </h1>
        <p className="text-sm text-gray-400">
          {t("profile.memberSince")} {user ? user.createdAt : Date.now()}
        </p>
      </div>

      <div className="w-full max-w-4xl px-4 overflow-x-auto">
        <div className="flex border-b border-gray-700 mb-6 min-w-max">
          <button
            className={`py-3 px-6 border-b-2 ${
               !['myOrders', 'settings', 'wallet', 'languageCurrency'].includes(activeTab)
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => handleActivateTab("")}
          >
            {t("profile.tabs.controlPanel")}
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "myOrders"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => handleActivateTab("myOrders")}
          >
            {t("profile.tabs.myOrders")}
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "wallet"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => handleActivateTab("wallet")}
          >
            {t("profile.tabs.wallet")}
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "settings"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => handleActivateTab("settings")}
          >
            {t("profile.tabs.settings")}
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "languageCurrency"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => handleActivateTab("languageCurrency")}
          >
            {t("profile.tabs.languageCurrency")}
          </button>
        </div>
      </div>
      {activeTab === "myOrders" ? (
        <MyOrders />
      ) : activeTab === "wallet" ? (
        <WalletSection
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          childMethodRefReloadError={childMethodRefReloadError}
        />
      ) : activeTab === "settings" ? (
        <SettingsProfileSection childMethodRefReloadError={childMethodRefReloadError}/>
      ) : activeTab === "languageCurrency" ? (
        <LanguageCurrencySection />
      ) : (
        <ControlPanel
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          childMethodRefReloadError={childMethodRefReloadError}
        />
      )}
    </section>
  );
}
