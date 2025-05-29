import { useUser } from "~/context/UserContext";
import type { Route } from "../+types/root";
import { Config } from "../config/config";
import { useState } from "react";
import { useNavigate } from "react-router";
import { t } from "i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Login" },
    { name: "description", content: t("login.metaDescription") },
  ];
}

export default function Login() {
  const [usernameOrEmail, setusernameOrEmail] = useState("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [onError, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const fetchUser = useUser().fetchUser;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    try {
      const response = await fetch(`${Config.AUTH.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(t('login.errors.invalid_credentials'));
        console.error("Login Error:", errorData);
        return;
      }

      navigate("/");
      fetchUser();
    } catch (err) {
      console.error("Login error:", err);
      alert(t("login.errors.network"));
    }
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen mt-20">
      <div className="flex-1 order-1 md:order-none md:w-1/2 flex justify-center items-center py-8 md:py-0">
        <div className="flex flex-col items-center w-full max-w-md px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl text-center mb-4">
            {t("login.title")}
          </h1>
          <div className="w-full h-[1px] bg-gray-400 mb-6"></div>

          <form onSubmit={handleSubmit} className="w-full" method="POST">
            {onError && <div className="mb-4 text-red-500">{onError}</div>}

            <div className="mb-4">
              <input
                type={isEmail ? "email" : "text"}
                placeholder={t("login.placeholders.usernameOrEmail")}
                name="text"
                value={usernameOrEmail}
                onChange={(e) => {
                  setIsEmail(e.target.value.includes("@"));
                  setusernameOrEmail(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder={t("login.placeholders.password")}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer"
            >
              {t("login.submit")}
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 order-0 md:order-none md:w-1/2 bg-transparent">
        <div className="h-[50vh] md:h-screen flex items-center justify-center p-4 md:p-8">
          <img
            src="/img/img-login.png"
            alt={t("login.altImage")}
            className="h-full w-full object-cover md:object-contain md:max-h-[80vh]"
          />
        </div>
      </div>
    </section>
  );
}
