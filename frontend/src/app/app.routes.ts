import {Routes} from '@angular/router';
import {ItemsComponent} from './features/items/items.component';
import {ItemComponent} from './features/items/item/item.component';
import {LoginComponent} from './features/account/login/login.component';
import {RegisterComponent} from './features/account/register/register.component';
import {HomeComponent} from './layout/home/home.component';
import {authGuard} from './core/guards/auth.guard';
import {ProfileComponent} from './features/profile/profile.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'items', component: ItemsComponent, canActivate: [authGuard]},
  {path: 'item/:id', component: ItemComponent, canActivate: [authGuard]},
  {path: 'account/login', component: LoginComponent},
  {path: 'account/register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]}
];
