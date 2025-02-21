import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {AccountService} from './account.service';
import {User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private accountService = inject(AccountService);
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  addProfilePicture(file: File){
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<User>(this.baseUrl + 'profile', formData).pipe(
      tap(user => {
        this.accountService.currentUser.set(user);
      })
    );
  }
}
