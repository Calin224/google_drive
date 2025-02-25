export class ItemParams{
  pageNumber = 1;
  pageSize = 5;
  categories: string[] = [];
  sort = 'dateAsc';
  search = '';
  folderId?: number;
  userId?: string;
  mutualFollowerIds?: string[];
}
