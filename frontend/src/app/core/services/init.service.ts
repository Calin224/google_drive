import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
    // const userId = localStorage.getItem('user_id');

    this.accountService.getUserInfo().subscribe();
    return of(true);
  }
}
