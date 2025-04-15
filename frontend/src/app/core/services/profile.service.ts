import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs';
import {AccountService} from './account.service';
import {User} from '../../shared/models/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addProfilePicture(file: File) {
    console.log('Uploading file:', file.name, 'size:', file.size, 'type:', file.type);

    const formData = new FormData();
    formData.append('file', file);

    console.log('FormData created');

    return this.http.post<User>(
      `${this.baseUrl}profile`,
      formData,
      { withCredentials: true }
    ).pipe(
      tap(user => {
        console.log('Profile update response:', user);
        if (user) {
          this.accountService.currentUser.set(user);
        }
      }),
      catchError(error => {
        console.error('Error uploading profile picture:', error);
        throw error;
      })
    );
  }
}
