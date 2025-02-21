import {Item} from './item';

export type Pdf = {
  id: number;
  name: string;
  url: string;
  contentType: string;
  itemId: number;
  item: Item;
}
