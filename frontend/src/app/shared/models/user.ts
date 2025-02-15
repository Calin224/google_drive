import { Item } from "./item";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  items: Item[]
}