import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {ItemParams} from '../../shared/models/itemParams';
import {Pagination} from '../../shared/models/pagination';
import {Item} from '../../shared/models/item';
import {AccountService} from './account.service';
import {map, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  categories: string[] = [];

  getItems(itemParams: ItemParams) {
    let params = new HttpParams();

    params = params.append('pageSize', itemParams.pageSize);
    params = params.append('pageIndex', itemParams.pageNumber);

    if (itemParams.categories && itemParams.categories.length > 0) {
      params = params.append('categories', itemParams.categories.join(','));
    }

    if (itemParams.folderId) {
      params = params.set('folderId', itemParams.folderId.toString());
    }

    if (itemParams.sort) {
      params = params.append('sort', itemParams.sort);
    }

    if (itemParams.search) {
      params = params.append('search', itemParams.search);
    }

    return this.http.get<Pagination<Item>>(this.baseUrl + 'items', {params});
  }

  getPublicItemsForUser(){
    return this.http.get<Item[]>(this.baseUrl + 'items/public-for-user');
  }

  getItem(id: number) {
    return this.http.get<Item>(this.baseUrl + 'items/' + id);
  }

  createItem(item: Partial<Item>, folderId: number) {
    item.folderId = folderId;
    return this.http.post<Item>(this.baseUrl + 'items', item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + 'items/' + id);
  }

  getCategories(folderId: number) {
    if (this.categories.length > 0) {
      return of(this.categories);
    }

    let params = new HttpParams();

    params = params.append('folderId', folderId);

    return this.http.get<string[]>(this.baseUrl + 'items/categories', {params}).pipe(
      tap(res => this.categories = res)
    );
  }

  setItemPublic(itemId: number, isPublic: boolean) {
    return this.http.post(this.baseUrl + 'items/set-public/' + itemId, isPublic).pipe(
      tap(() => console.log(`Item ${itemId} set to ${isPublic ? 'Public' : 'Private'}`))
    )
  }
}
