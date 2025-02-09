import {Routes} from '@angular/router';
import {ItemsComponent} from './features/items/items.component';
import {ItemComponent} from './features/items/item/item.component';

export const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'item/:id', component: ItemComponent}
];
