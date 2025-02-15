import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemParams } from '../../shared/models/itemParams';
import { Pagination } from '../../shared/models/pagination';
import { Item } from '../../shared/models/item';
import { AccountService } from './account.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  categories: string[] = [];

  getItems(itemParams: ItemParams) {
    let params = new HttpParams();

    params = params.append('pageSize', itemParams.pageSize);
    params = params.append('pageIndex', itemParams.pageNumber);

    if(itemParams.categories && itemParams.categories.length > 0) {
      params = params.append('categories', itemParams.categories.join(','));
    }

    return this.http.get<Pagination<Item>>(this.baseUrl + 'items', {params});
  }

  getItem(id: number) {
    const user = this.accountService.currentUser();

    if(!user){
      throw new Error('User not found');
    }

    return this.http.get<Item>(this.baseUrl + 'items/' + id);
  }

  createItem(item: Partial<Item>) {
    const user = this.accountService.currentUser();

    if(!user){
      throw new Error('User not found');
    }

    const newItem: Partial<Item> = {
      ...item,
    }

    return this.http.post<Item>(this.baseUrl + 'items', newItem);
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
