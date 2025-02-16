import {Pdf} from './pdf';

export interface Item {
    name: string
    description: string
    category: string
    photos?: Photo[]
    pdfs?: Pdf[]
    id: number
}

export interface Photo {
  url: string
  publicId?: string
  itemId: number
  id: number;
}
