import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  addPhotos(itemId: number, files: FileList) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post(this.baseUrl + 'photo/' + itemId, formData);
  }

  deletePhoto(itemId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'photo/' + itemId + '/' + photoId);
  }
}
