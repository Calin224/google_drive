import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  addPdf(itemId: number, files: File[]){
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post(this.baseUrl + 'pdf/' + itemId, formData);
  }

  deletePdf(pdfId: number, itemId: number) {
    return this.http.delete(this.baseUrl + 'pdf/' + itemId + '/' + pdfId);
  }
}
