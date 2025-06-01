import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Config } from "~/config/config";
import type { RefObject } from "react";

export default function WalletSection({
  walletBalance,
  setWalletBalance,
  childMethodRefReloadError,
}: {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  childMethodRefReloadError: RefObject<(Array<() => void>)>;
}) {
  const [topUpAmount, setTopUpAmount] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onErrorAmountToUp, setOnErrorAmountToUp] = useState<string | null>(
    null
  );

  const [paymentMethod, setPaymentMethod] = useState("card");
  const { t } = useTranslation();

  const reloadError: () => void = () => {
    if (onErrorAmountToUp) setOnErrorAmountToUp(null);
  };

  childMethodRefReloadError.current.push(reloadError);

  const handleTopUp = async () => {
    reloadError();
    const checkTopUpAmount = Number(topUpAmount);
    if (!checkTopUpAmount || isNaN(checkTopUpAmount) || checkTopUpAmount <= 0) {
      alert(t("profile.wallet.invalidAmount"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(Config.USER.WALLET, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(topUpAmount),
          paymentMethod: paymentMethod,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setWalletBalance(walletBalance + data.amount);
        setTopUpAmount("0");
        alert(t("profile.wallet.topUpSuccess"));
      } else {
        setOnErrorAmountToUp(data.message);
      }
    } catch (error) {
      console.error("Error topping up wallet:", error);
      alert(t("profile.wallet.topUpError"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-4xl px-4">
      <div className="bg-gray-800 p-6 mb-6">
        <h3 className="text-xl text-gray-300 mb-6 text-center">
          {t("profile.wallet.currentBalance")}
        </h3>
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-white">
            {walletBalance}€
          </span>
        </div>
      </div>

      <div className="bg-gray-800 p-6">
        <h3 className="text-xl text-gray-300 mb-6 text-center">
          {t("profile.wallet.addMoney")}
        </h3>

        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">
              {t("profile.wallet.amount")}
            </label>
            {onErrorAmountToUp && (
              <div className="mb-4 text-red-500">{onErrorAmountToUp}</div>
            )}
            <input
              type="number"
              min="1"
              step="0.01"
              value={topUpAmount}
              onChange={(e) => {
                const value: string = e.target.value;

                if (value.trim() !== "" && Number(value) < 0) {
                  return;
                }

                if (value.startsWith("0") && value.length > 1) {
                  setTopUpAmount(value.slice(1));
                  return;
                }

                setTopUpAmount(value);
              }}
              placeholder={t("profile.wallet.enterAmount")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-700 text-white border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              {t("profile.wallet.paymentMethod")}
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-700 text-white border-gray-600"
            >
              <option value="card">{t("profile.wallet.creditCard")}</option>
              <option value="paypal">PayPal</option>
              <option value="bank">{t("profile.wallet.bankTransfer")}</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[5, 10, 25, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => setTopUpAmount(amount.toString())}
                className="py-2 px-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                {amount}€
              </button>
            ))}
          </div>

          <button
            onClick={handleTopUp}
            disabled={isLoading}
            className="w-full bg-secondary text-white py-3 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? t("profile.wallet.processing")
              : t("profile.wallet.addMoney")}
          </button>

          <p className="text-xs text-gray-400 text-center">
            {t("profile.wallet.securePayment")}
          </p>
        </div>
      </div>
    </div>
  );
}
