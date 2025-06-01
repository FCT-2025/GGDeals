import type { Route } from "../+types/root";
import InputPhoneNumber from "~/utils/InputPhoneNumber";
import { Config } from "../config/config";
import { useUser } from "~/context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { t } from "i18next";
import { Trans } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Register" },
    { name: "description", content: "Register in GGdeal" },
  ];
}

export default function Register() {
  const [onError, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    birthdate: "",
    phone: "",
  });
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${Config.AUTH.REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        setError(t(`register.error.${err.error || "default"}`));
        console.warn(err.message || t("register.error.failed"));
        return;
      }

      navigate("/login");
      updateUser();
    } catch (err) {
      console.error("Error al registrar:", err);
      alert(t("register.error.network"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen mt-20">
      <div className="flex-1 order-0 md:order-none md:w-1/2">
        <div className="min-h-[300px] h-[40vh] md:h-screen flex items-center justify-center p-4 md:p-8">
          <img
            src="/img/img-register.png"
            alt="Register illustration"
            className="h-auto w-auto max-h-full max-w-full object-contain md:max-h-[80vh] transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex-1 order-1 md:order-none md:w-1/2 flex justify-center items-center py-8 md:py-0">
        <div className="flex flex-col items-center w-full max-w-md px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl text-center mb-4">
            {t("register.title")}
          </h1>
          <div className="w-full h-[1px] bg-gray-400 mb-4"></div>
          <p className="text-sm text-gray-600 mb-6">
            <Trans
              i18nKey="register.description"
              components={{ red: <span className="text-red-500" /> }}
            />
          </p>

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {onError && <div className="mb-4 text-red-500">{onError}</div>}

            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="absolute -top-3 -left-2 text-red-500 text-sm z-10"
              >
                *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("register.placeholders.email")}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="username"
                className="absolute -top-3 -left-2 text-red-500 text-sm z-10"
              >
                *
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("register.placeholders.username")}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="absolute -top-3 -left-2 text-red-500 text-sm z-10"
              >
                *
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("register.placeholders.password")}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row mb-6">
              <div className="w-full sm:w-1/2 sm:mr-2 mb-4 sm:mb-0 relative">
                <label
                  htmlFor="birthdate"
                  className="absolute -top-3 -left-2 text-red-500 text-sm z-10"
                >
                  *
                </label>
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
                />
              </div>

              <div className="w-full sm:w-1/2 sm:ml-2">
                <InputPhoneNumber
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-center text-black font-bold py-3 text-lg rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer"
            >
              {t("register.submit")}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {t("register.alreadyHaveAccount")} 
                <a href="/login" className="text-blue-500 ml-1 hover:underline">
                  {t("login.title")}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}