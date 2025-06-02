
import { Config } from "~/config/config";

export type Plataform = {
    id: number;
    name: string;
    src:string;
    count:number;
}

export async function getPlataforms(): Promise<Plataform[]> {
    const res = await fetch(Config.GGDEAL.PLATAFORM);
    const data = await res.json();
    return data as Plataform[];
}

export async function getPlataformsByTypeId(id:number): Promise<Plataform[]> {
    const res = await fetch(`http://localhost:8080/api/ggdeal/platform/type-id/${id}`);
    const data = await res.json();
    return data as Plataform[];
}