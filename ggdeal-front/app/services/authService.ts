import { Config } from "../config/config";

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  avatarPath?: string;
  role: string;
  isVerified: boolean;
  numberPhone?: string;
}

export async function getUsuario(): Promise<User | null> {
  try {
    const res = await fetch(`${Config.AUTH.TOKEN}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn("No autorizado o sin cookie");
      return null;
    }

    return data as User;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}
