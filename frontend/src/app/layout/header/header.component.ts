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
import {ButtonDirective, ButtonIcon} from 'primeng/button';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    PrimeTemplate,
    RouterLink,
    Ripple,
    NgClass,
    ButtonDirective,
    Menu,
    ButtonIcon,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  accountService = inject(AccountService);
  private router = inject(Router);

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
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        href: "/"
      },
      {
        label: 'Threads',
        icon: 'pi pi-list',
        href: '/threads'
      }
    ]

    this.its = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        href: '/profile'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        href: '/settings'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ]
  }
}
