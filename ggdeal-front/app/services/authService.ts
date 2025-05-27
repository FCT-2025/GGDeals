import { Config } from "../config/config";

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  avatarPath: string;
  role: string;
  isVerified: boolean;
  numberPhones: string;
}

export async function getUsuario(): Promise<User | null> {
  try {
    console.log(Config.AUTH.TOKEN);
    const res = await fetch(`${Config.AUTH.TOKEN}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn("No autorizado o sin cookie");
      return null;
    }
    console.log("Usuario obtenido correctamente");
    console.log(data)

    return data as User;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}
