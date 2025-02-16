import {Component, inject, OnInit} from '@angular/core';
import {AccountService} from '../../core/services/account.service';
import {User} from '../../shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  accountService = inject(AccountService);
  private router = inject(Router);
  user?: User | null;

  ngOnInit(): void {
    if(this.accountService.currentUser() == null) {
      this.router.navigate(['/login']);
    }

    this.user = this.accountService.currentUser();
  }
}
