import { Item } from "./item";

export type Folder = {
    id: number;
    name: string;
    items: Item[]
}