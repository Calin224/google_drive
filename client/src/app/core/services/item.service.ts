import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Item} from '../../shared/models/item';
import {ItemParams} from '../../shared/models/itemParams';
import {Pagination} from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  categories: string[] = [];

  getItems(itemParams: ItemParams) {
    let params = new HttpParams();

    params = params.append('pageSize', itemParams.pageSize);
    params = params.append('pageIndex', itemParams.pageNumber);

    if (itemParams.categories && itemParams.categories.length > 0) {
      params = params.append('categories', itemParams.categories.join(','));
    }

    return this.http.get<Pagination<Item>>(this.baseUrl + 'items', {params});
  }

  getItem(id: number) {
    return this.http.get<Item>(this.baseUrl + 'items/' + id);
  }

  createItem(item: { name: string, description: string, category: string }) {
    return this.http.post<Item>(this.baseUrl + 'items/', item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + 'items/' + id);
  }

  getCategories() {
    if (this.categories.length > 0) return;

    return this.http.get<string[]>(this.baseUrl + 'items/categories').subscribe({
      next: res => {
        this.categories = res;
        console.log(this.categories);
      }
    })
  }
}
