import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getItems(){
    return this.http.get<Item[]>(this.baseUrl + 'items');
  }

  getItem(id: number){
    return this.http.get<Item>(this.baseUrl + 'items/' + id);
  }

  createItem(item: {name: string, description: string, category: string}){
    return this.http.post<Item>(this.baseUrl + 'items/', item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + 'items/' + id);
  }
}
