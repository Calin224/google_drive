import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Item, Photo} from '../../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  addPhotos(itemId: number, files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    return this.http.post<Item>(`${this.baseUrl}photo/${itemId}`, formData);
  }

  deletePhoto(itemId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'photo/' + itemId + '/' + photoId);
  }

  getAll(itemId: number){
    return this.http.get<Photo[]>(this.baseUrl + itemId + '/get-all');
  }
}
