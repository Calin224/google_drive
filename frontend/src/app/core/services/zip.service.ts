import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Zip} from '../../shared/models/zip';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  baseUrl = 'https://googledriveapi.azurewebsites.net/api/';
  private http = inject(HttpClient);

  uploadZip(itemId: number, file: File){
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Zip>(`${this.baseUrl}zip/upload/${itemId}`, formData);
  }

  getAllZips(itemId: number){
    return this.http.get<Zip[]>(this.baseUrl + itemId);
  }

  deleteZip(zipId: number){
    return this.http.delete(this.baseUrl + "zip/" + zipId);
  }
}
