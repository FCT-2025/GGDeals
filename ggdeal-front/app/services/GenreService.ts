import { Config } from "~/config/config";

export type Genre = {
    id:number;
    name:string;
    gameCount:number
}

export async function getGenres(): Promise<Genre[]> {
    const res = await fetch(Config.GGDEAL.GENRE);
    const data = await res.json();
    return data as Genre[];
}