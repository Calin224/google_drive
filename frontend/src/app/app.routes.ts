import {Routes} from '@angular/router';
import {ItemsComponent} from './features/items/items.component';
import {ItemComponent} from './features/items/item/item.component';
import {LoginComponent} from './features/account/login/login.component';
import {RegisterComponent} from './features/account/register/register.component';
import {HomeComponent} from './layout/home/home.component';
import {authGuard} from './core/guards/auth.guard';
import {ProfileComponent} from './features/profile/profile.component';
import { FolderListComponent } from './features/folder-list/folder-list.component';
import {FolderComponent} from './features/folder-list/folder/folder.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'folders', component: FolderListComponent, canActivate: [authGuard]},
  {path: 'folder/:id', component: FolderComponent, canActivate: [authGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [authGuard]},
  {path: 'item/:id', component: ItemComponent, canActivate: [authGuard]},
  {path: 'account/login', component: LoginComponent},
  {path: 'account/register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]}
];
