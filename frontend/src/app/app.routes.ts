import { Routes } from '@angular/router';
import { ItemsComponent } from './features/items/items.component';
import { ItemComponent } from './features/items/item/item.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';

export const routes: Routes = [
    {path: '', component: ItemsComponent},
    {path: 'item/:id', component: ItemComponent},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent}
];
