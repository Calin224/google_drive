import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {User} from '../../shared/models/user';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://googledriveapi.azurewebsites.net/api/';
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);

    return this.http.post<User>(this.baseUrl + 'login', values, {params, withCredentials: true});
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info').pipe(
      map(user => {
        console.log('User:', user);
        this.currentUser.set(user);
        return user;
      })
    )
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values, {withCredentials: true});
  }

  updateProfile(updateData: any) {
    return this.http.put(this.baseUrl + 'account/update-profile', updateData)
      .pipe(
        tap(() => {
          this.http.get<User>(this.baseUrl + 'account/user-info').subscribe({
            next: updatedUser => this.currentUser.set(updatedUser),
            error: err => console.error('Error fetching updated user:', err)
          });
        })
      );
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {}, {withCredentials: true});
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + 'account/all-users');
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseUrl + 'account/auth-status');
  }

  initializeUser() {
    this.getUserInfo().subscribe();
  }
}
