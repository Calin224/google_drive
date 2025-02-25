import {Component, inject, OnInit} from '@angular/core';
import {AccountService} from '../../../core/services/account.service';
import {User} from '../../../shared/models/user';
import {Listbox} from 'primeng/listbox';
import {PrimeTemplate} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {FollowService} from '../../../core/services/follow.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-search-user',
  imports: [
    Listbox,
    PrimeTemplate,
    ButtonDirective,
    Ripple,
    NgIf
  ],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent implements OnInit{
  private accountService = inject(AccountService);
  private followService = inject(FollowService);
  users?: User[];
  followers?: User[];
  following?: User[];
  isFollowing: { [key: string]: boolean } = {};

  ngOnInit(){
    this.accountService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        users.forEach(user => this.checkFollowStatus(user.id));
      }
    })
    this.followService.getFollowing().subscribe({
      next: res => {
        this.following = res;
      }
    })
    this.followService.getFollowers().subscribe({
      next: res => {
        this.followers = res;
      }
    })
  }

  checkFollowStatus(userId: string) {
    this.followService.existsFollow(userId).subscribe({
      next: res => {
        this.isFollowing[userId] = res.existFollow;
      }
    });
  }

  followUser(targetUserId: string) {
    this.followService.toggleFollow(targetUserId).subscribe({
      next: _ => {
        this.checkFollowStatus(targetUserId);
      }
    });
  }
}
