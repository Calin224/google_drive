import {HttpClient, HttpParams} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Folder } from '../../shared/models/folder';
import {Pagination} from '../../shared/models/pagination';
import {FolderParams} from '../../shared/models/folderParams';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  getFolders(folderParams: FolderParams) {
    let params = new HttpParams();

    params = params.append('pageSize', folderParams.pageSize);
    params = params.append('pageIndex', folderParams.pageNumber);

    if(folderParams.appUserId){
      params = params.set('appUserId', folderParams.appUserId);
    }

    return this.http.get<Pagination<Folder>>(this.baseUrl + 'folders', {params});
  }

  getFolder(id: number){
    return this.http.get<Folder>(this.baseUrl + 'folders/' + id);
  }

  createFolder(folder: any) {
    return this.http.post<Folder>(this.baseUrl + 'folders/', folder);
  }

  deleteFolder(id: number) {
    return this.http.delete(this.baseUrl + 'folders/' + id);
  }
}
