import type { Route } from "../+types/root";
import { Config } from "../config/config";
import { useUser } from "~/context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { t } from "i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: t("login.title") },
    { name: "description", content: t("login.metaDescription") },
  ];
}

export default function Login() {
  const [onError, setError] = useState<string | null>(null);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    emailUsername: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const dataForm = {
      [isEmail ? 'email' : 'username'] : formData.emailUsername,
      password: formData.password
    }

    try {
      const res = await fetch(`${Config.AUTH.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
        credentials: "include",
      });


      if (!res.ok) {
        const err = await res.json();
        setError(t(`login.errors.${err.error || "default"}`));
        console.warn(err.message || "Login failed");
        setIsLoading(false);
        return;
      }

      fetchUser();
      navigate("/");
    } catch (err) {
      console.error("Error en login:", err);
      setError(t("login.errors.network"));
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  return (
    <section className="flex flex-col md:flex-row min-h-screen mt-20">
      <div className="flex-1 order-1 md:order-none md:w-1/2">
        <div className="min-h-[300px] h-[40vh] md:h-screen flex items-center justify-center p-4 md:p-8">
          <img
            src="/img/img-login.png"
            alt={t("login.altImage")}
            className="h-auto w-auto max-h-full max-w-full object-contain md:max-h-[80vh] transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex-1 order-0 md:order-none md:w-1/2 flex justify-center items-center py-8 md:py-0">
        <div className="flex flex-col items-center w-full max-w-md px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl text-center mb-4">
            {t("login.title")}
          </h1>
          <div className="w-full h-[1px] bg-gray-400 mb-6"></div>

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {onError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 text-sm rounded">
                {onError}
              </div>
            )}

            <div className="mb-4">
              <input
                type={isEmail ? 'email' : 'text'}
                name="emailUsername"
                value={formData.emailUsername}
                onChange={(e)=> {
                  console.log(e.target.value.includes('@'))
                  setIsEmail(e.target.value.includes('@'));
                  handleChange(e);
                }}
                placeholder={t("login.placeholders.usernameOrEmail")}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("login.placeholders.password")}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-center text-black font-bold py-3 text-lg rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cargando..." : t("login.submit")}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                ¿No tienes una cuenta? 
                <a href="/register" className="text-blue-500 ml-1 hover:underline">
                  {t("register.title")}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}