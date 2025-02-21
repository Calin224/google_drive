import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Editor, EditorDto} from '../../shared/models/editor';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  uploadEditorText(itemId: number, text: string){
    const editorDto: EditorDto = {text};
    return this.http.post<Editor>(this.baseUrl + "editor/" + itemId, editorDto);
  }

  editEditorText(itemId: number, text: string){
    const editorDto: EditorDto = {text};
    return this.http.put(this.baseUrl + 'editor/' + itemId, editorDto);
  }

  deleteEditorText(itemId: number){
    return this.http.delete(this.baseUrl + 'editor/' + itemId);
  }

  hasEditor(itemId: number){
    return this.http.get<boolean>(this.baseUrl + 'editor/' + itemId);
  }
}
