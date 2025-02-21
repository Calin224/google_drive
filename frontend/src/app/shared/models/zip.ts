import {Item} from './item';

export type Zip = {
  fileName: string;
  fileSize: string;
  blobUrl: string;
  uploadedAt: Date;
  contentType: string;
  itemId: number;
  item: Item;
  id:number;
}
