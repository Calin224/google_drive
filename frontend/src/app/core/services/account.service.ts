import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  login(values: any){
    let params = new HttpParams();
    params = params.append('useCookies', true);

    return this.http.post<User>(this.baseUrl + 'login', values, {params});
  }

  getUserInfo(){
    return this.http.get<User>(this.baseUrl + 'account/user-info').pipe(
      map(user => {
        console.log('User:', user);
        this.currentUser.set(user);
        return user;
      })
    )
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values);
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {});
  }

  initializeUser() {
    this.getUserInfo().subscribe();
  }
}
