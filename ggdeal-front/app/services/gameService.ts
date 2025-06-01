import { Config } from "../config/config";
import type { Game } from "~/types/Game";
import type { PaginationGame } from "~/types/PaginationGame";


export async function getPageGames(): Promise<PaginationGame> {
  const res = await fetch(Config.GGDEAL.GAME);
  const data = await res.json();
  return data as PaginationGame;
}

async function getGameBySlugOrId(id: number | string): Promise<Game> {
  const res = await fetch(`${Config.GGDEAL.GAME}/${id}`);
  const data = await res.json();
  return data as Game;
}

async function getGameByName(name: string): Promise<Game[]> {
  const res = await fetch(`${Config.GGDEAL}/game?name=${name}`);
  const data = await res.json();
  return data as Game[];
}


