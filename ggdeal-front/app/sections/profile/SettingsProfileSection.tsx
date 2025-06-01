import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "~/context/UserContext";
import { Config } from "~/config/config";
import type { RefObject } from "react";

export default function SettingSection({childMethodRefReloadError}: {  childMethodRefReloadError: RefObject<Array<() => void>>;}) {
  const { t } = useTranslation();
  const { user, fetchUser } = useUser();

  // Estados para el formulario de perfil
  const [profileData, setProfileData] = useState<{
    username: string;
    email: string;
    numberPhone: string;
    profileImage: File | null;
  }>({
    username: user ? user.username : "",
    email: user ? user.email : "",
    numberPhone: user?.numberPhone ? user.numberPhone || "" : "",
    profileImage: null,
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Estados para el formulario de contraseña
  const [passwordData, setPasswordData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const reloadError: () => void = () => {
    if (settingsError) setSettingsError(null);
    if (passwordError) setSettingsError(null);
  };

  childMethodRefReloadError.current.push(reloadError);

  // Manejadores para el formulario de perfil
  const handleProfileInputChange = (
    field: "username" | "email" | "numberPhone",
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    reloadError();

    try {
      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("numberPhone", profileData.numberPhone);
      if (profileData.profileImage) {
        formData.append("avatarPath", profileData.profileImage);
      }

      const response = await fetch(Config.USER.PROFILE, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        fetchUser();
        console.log("Perfil actualizado:", result);
      } else {
        setSettingsError(result.message);
        setProfileData({
          username: user ? user.username : "",
          email: user ? user.email : "",
          numberPhone: user?.numberPhone ? user.numberPhone || "" : "",
          profileImage: null,
        });

        console.error("Error al actualizar perfil");
      }
    } catch (error) {
      setSettingsError("Error de conexión");
      console.error("Error:", error);
    } finally {
      setProfileLoading(false);
    }
  };

 
  const handlePasswordInputChange = (
    field: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  
    if (passwordError) setPasswordError("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    reloadError();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    // Validar longitud mínima de contraseña
    if (passwordData.newPassword.length < 5) {
      setPasswordError("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(Config.USER.CHANGE_PASSWORD, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: ''
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Contraseña cambiada:", result);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const errorData = await response.json();
        setPasswordError(errorData.message || "Error al cambiar la contraseña");
        console.error("Error:" + errorData);
      }
    } catch (error) {
      setPasswordError("Error de conexión");
      console.error("Error:", error);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-4">
      <div className="bg-gray-800 p-6 space-y-8">
        {/* Formulario de perfil (sin confirmación de contraseña) */}
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {t("profile.settings.profileInfo")}
          </h2>

          {/* Imagen de perfil */}
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden mr-4">
              <img
                src={
                  profileData.profileImage
                    ? URL.createObjectURL(profileData.profileImage)
                    : "/img/user.png"
                }
                alt={t("profile.settings.profileImage")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-0"
              />
              <span className="text-gray-400 text-sm">jpg, .png</span>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h3 className="text-gray-300 mr-4 mb-2 sm:mb-0 whitespace-nowrap">
              {t("profile.settings.username")}
            </h3>
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder={t("profile.settings.username")}
                value={profileData.username}
                onChange={(e) =>
                  handleProfileInputChange("username", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h3 className="text-gray-300 mr-4 mb-2 sm:mb-0 whitespace-nowrap">
              {t("profile.settings.email")}
            </h3>
            <div className="flex-1 w-full">
              <input
                type="email"
                placeholder={t("profile.settings.email")}
                value={profileData.email}
                onChange={(e) =>
                  handleProfileInputChange("email", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h3 className="text-gray-300 mr-4 mb-2 sm:mb-0 whitespace-nowrap">
              {t("profile.settings.phone")}
            </h3>
            <div className="flex-1 w-full">
              <input
                type="tel"
                placeholder={t("profile.settings.phone")}
                value={profileData.numberPhone}
                onChange={(e) =>
                  handleProfileInputChange("numberPhone", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {settingsError && (
            <div className="text-red-400 text-sm">{settingsError}</div>
          )}

          <button
            type="submit"
            disabled={profileLoading}
            className="w-full sm:w-auto bg-secondary text-center text-white py-2 px-4 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {profileLoading
              ? "Actualizando..."
              : t("profile.settings.updateProfile")}
          </button>
        </form>

        {/* Separador */}
        <hr className="border-gray-700" />

        {/* Formulario de cambio de contraseña */}
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {t("profile.settings.changePassword")}
          </h2>

          <div className="space-y-4 max-w-md">
            <input
              type="password"
              placeholder={t("profile.settings.currentPassword")}
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordInputChange("currentPassword", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              required
            />

            <input
              type="password"
              placeholder={t("profile.settings.newPassword")}
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordInputChange("newPassword", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              required
            />

            <input
              type="password"
              placeholder={t("profile.settings.confirmNewPassword")}
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700"
              required
            />

            {passwordError && (
              <div className="text-red-400 text-sm">{passwordError}</div>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {passwordLoading
                ? "Cambiando..."
                : t("profile.settings.changePassword")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
