function getEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`La variable de entorno ${name} no está definida`);
  }
  return value;
}

const BASE_URL = getEnvVar("VITE_API_BASE_URL");

function buildUrl(path: string): string {
  if (path.startsWith("/")) {
    return BASE_URL + path;
  }
  return BASE_URL + "/" + path;
}

export const Config = {
  GGDEAL: {
    GAME: buildUrl(getEnvVar('VITE_API_GGDEAL_GAME')),
    PLATAFORM: buildUrl(getEnvVar('VITE_API_GGDEAL_PLATAFORM')),
    GENRE: buildUrl(getEnvVar('VITE_API_GGDEAL_GENRE'))
  },
  PURCHARSE: buildUrl(getEnvVar('VITE_API_PURCHARSE')),
  CART: {
    GET: buildUrl(getEnvVar('VITE_API_CART_GET')),
    ADD: buildUrl(getEnvVar('VITE_API_CART_ADD')),
    REMOVE: buildUrl(getEnvVar('VITE_API_CART_REMOVE')),
    SUMMARY: buildUrl(getEnvVar('VITE_API_CART_SUMMARY')),
    UPDATE: buildUrl(getEnvVar('VITE_API_CART_UPDATE')),
    CLEAR: buildUrl(getEnvVar('VITE_API_CART_CLEAR')),
  },
  USER: {
    WALLET: buildUrl(getEnvVar("VITE_API_USER_URL_WALLET")),
    PROFILE: buildUrl(getEnvVar("VITE_API_USER_URL_PROFILE")),
    CHANGE_PASSWORD: buildUrl(getEnvVar("VITE_API_AUTH_URL_CHANGE_PASSWORD")),
  },
  AUTH: {
    LOGIN: buildUrl(getEnvVar("VITE_API_AUTH_URL_LOGIN")),
    REGISTER: buildUrl(getEnvVar("VITE_API_AUTH_URL_REGISTER")),
    TOKEN: buildUrl(getEnvVar("VITE_API_AUTH_URL_TOKEN")),
    LOGOUT: buildUrl(getEnvVar("VITE_API_AUTH_URL_LOGOUT")),
  },
};
