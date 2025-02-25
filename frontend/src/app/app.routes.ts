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
import {SearchUserComponent} from './features/account/search-user/search-user.component';
import {UpdateProfileComponent} from './features/account/update-profile/update-profile.component';
import {PublicItemsComponent} from './features/items/public-items/public-items.component';
import {mutualFriendGuard} from './core/guards/mutual-friend.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'folders', component: FolderListComponent, canActivate: [authGuard]},
  {path: 'folder/:id', component: FolderComponent, canActivate: [authGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [authGuard]},
  {path: 'item/:id', component: ItemComponent, canActivate: [authGuard]},
  {path: 'account/login', component: LoginComponent},
  {path: 'account/register', component: RegisterComponent},
  {path: 'account/search-user', component: SearchUserComponent},
  {path: 'account/update-profile', component: UpdateProfileComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'public-items', component: PublicItemsComponent, canActivate: [authGuard]}
];
