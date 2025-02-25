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
    this.accountService.getUserInfo().subscribe();
    return of(true);
  }
}
