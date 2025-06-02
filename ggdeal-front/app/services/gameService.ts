import { Config } from "../config/config";
import type { Game } from "~/types/Game";
import type { PaginationGame } from "~/types/PaginationGame";

export async function getPageGames(
  query?: string
): Promise<PaginationGame | null> {
  try {
    const res = await fetch(Config.GGDEAL.GAME + (query ?? ""));
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return null;
    }
    return data as PaginationGame;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getGameBySlugOrId(
  id: number | string
): Promise<Game | null> {
  try {
    const res = await fetch(`${Config.GGDEAL.GAME}/${id}`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return null;
    }
    return data as Game;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getGameByName(name: string): Promise<Game[]> {
  const res = await fetch(`${Config.GGDEAL}/game?name=${name}`);
  const data = await res.json();
  return data as Game[];
}
