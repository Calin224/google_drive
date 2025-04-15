import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import {Menubar} from 'primeng/menubar';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {Avatar} from 'primeng/avatar';
import {InputText} from 'primeng/inputtext';
import {Drawer} from 'primeng/drawer';
import {StyleClass} from 'primeng/styleclass';
import {Ripple} from 'primeng/ripple';
import {NgClass} from '@angular/common';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import {Menu} from 'primeng/menu';
import {BusyService} from '../../core/services/busy.service';
import {ProgressBar} from 'primeng/progressbar';
import {NamePipe} from '../../shared/pipes/name.pipe';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ProgressBar,
    Avatar,
    NamePipe,
    Button,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  accountService = inject(AccountService);
  busyService = inject(BusyService);
  private router = inject(Router);

  user = this.accountService.currentUser();

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    });
  }

  items?: MenuItem[];

  its?: MenuItem[];

  ngOnInit() {
    console.log(this.user?.profile.url);

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        href: "/"
      },
      {
        label: 'Threads',
        icon: 'pi pi-list',
        href: '/folders'
      },
      {
        label: 'Public Items',
        icon: 'pi pi-objects-column',
        href: '/public-items'
      }
    ]

    this.its = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.router.navigateByUrl('/profile')
      },
      {
        label: 'All users',
        icon: 'pi pi-users',
        command: () => this.router.navigateByUrl('/account/search-user')
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ]
  }
}
