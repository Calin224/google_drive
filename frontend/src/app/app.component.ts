import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {AccountService} from './core/services/account.service';
import {HomeComponent} from './layout/home/home.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  location = inject(Location);

  ngOnInit(): void {
    this.accountService.initializeUser();
  }
}
