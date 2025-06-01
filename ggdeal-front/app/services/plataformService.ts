
import { Config } from "~/config/config";

export type Plataform = {
    id: number;
    name: string;
    pathLogo:string;
}

export async function getPlataforms(): Promise<Plataform[]> {
    const res = await fetch(Config.GGDEAL.PLATAFORM);
    const data = await res.json();
    return data as Plataform[];
}