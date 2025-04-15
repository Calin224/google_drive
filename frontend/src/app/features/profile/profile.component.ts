import {Component, inject, OnInit} from '@angular/core';
import {AccountService} from '../../core/services/account.service';
import {Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {FollowService} from '../../core/services/follow.service';
import {User} from '../../shared/models/user';
import {NamePipe} from '../../shared/pipes/name.pipe';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NamePipe,
    DialogModule,
    Dialog,
    Card,
    Divider,
    ButtonDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [
    MessageService
  ]
})
export class ProfileComponent implements OnInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  private followService = inject(FollowService);

  followers: User[] = [];
  following: User[] = [];
  followersLen: number = 0;
  followingLen: number = 0;

  user: User | null = null;

  followersVisible: boolean = false;
  followingVisible: boolean = false;

  constructor() {
    this.user = this.accountService.currentUser();
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigateByUrl('/account/login');
      return;
    }

    this.followService.getFollowing().subscribe({
      next: res => {
        this.following = res || [];
        this.followingLen = this.following.length;
      }
    });

    this.followService.getFollowers().subscribe({
      next: res => {
        this.followers = res || [];
        this.followersLen = this.followers.length;
      }
    });
  }

  showDialog() {
    this.followersVisible = true;
  }

  showFollowingDialog() {
    this.followingVisible = true;
  }

  deleteFolder(id: number) {
    // Implement your delete logic here
  }
}
