import {Item} from './item';

export type Editor = {
  text: string;
  itemId: number;
  item: Item;
}

export type EditorDto = {
  text: string;
}
