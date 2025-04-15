import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import {catchError, forkJoin, Observable, of, tap} from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
    return forkJoin({
      user: this.accountService.getUserInfo()
    }).pipe(
      catchError(error => {
        console.error('Eroare la inițializare:', error);
        return of({ user: null });
      })
    );
  }
}
