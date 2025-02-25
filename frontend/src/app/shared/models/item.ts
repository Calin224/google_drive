import {Pdf} from './pdf';
import {Zip} from './zip';
import {Editor} from './editor';

export interface Item {
  name: string
  description: string
  category: string
  photos?: Photo[]
  pdfs?: Pdf[]
  zips?: Zip[]
  editor?: Editor
  dateCreated: Date
  downloadCount: number
  id: number
  folderId: number
  isPublic: boolean
  appUserId: string;
}

export interface Photo {
  url: string
  publicId?: string
  itemId: number
  id: number;
}
