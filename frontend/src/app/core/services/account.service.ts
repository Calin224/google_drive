import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {User} from '../../shared/models/user';
import {map, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // Use signal for reactive state management
  currentUser = signal<User | null>(null);

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);

    return this.http.post<User>(this.baseUrl + 'login', values, {params, withCredentials: true}).pipe(
      tap(user => {
        this.currentUser.set(user);
        // Store user in localStorage to persist across page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info', {withCredentials: true}).pipe(
      map(user => {
        console.log('User info retrieved:', user);
        this.currentUser.set(user);
        // Update localStorage with latest user info
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      })
    );
  }

  // Load user from localStorage on app initialization
  loadStoredUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
        return true;
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    return false;
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values);
  }

  updateProfile(updateData: any) {
    return this.http.put(this.baseUrl + 'account/update-profile', updateData, {withCredentials: true})
      .pipe(
        tap(() => {
          // Refresh user info after profile update
          this.getUserInfo().subscribe({
            next: updatedUser => console.log('Profile updated, new user info:', updatedUser),
            error: err => console.error('Error fetching updated user:', err)
          });
        })
      );
  }

  logout() {
    // Clear local storage on logout
    localStorage.removeItem('user');
    this.currentUser.set(null);
    return this.http.post(this.baseUrl + 'account/logout', {}, {withCredentials: true});
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + 'account/all-users', {withCredentials: true});
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseUrl + 'account/auth-status', {withCredentials: true});
  }

  initializeUser() {
    // First try to load from localStorage
    const hasStoredUser = this.loadStoredUser();

    // Then refresh from server
    this.getUserInfo().subscribe({
      next: user => console.log('User initialized from server'),
      error: err => {
        console.error('Error initializing user:', err);
        // If we have a stored user, keep using it despite the error
        if (!hasStoredUser) {
          this.currentUser.set(null);
        }
      }
    });
  }
}
