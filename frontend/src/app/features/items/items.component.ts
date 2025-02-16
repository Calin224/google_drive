
import {Component, inject, OnInit} from '@angular/core';
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../shared/models/item';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CreateItemComponent} from '../../shared/dialogs/create-item/create-item.component';
import {ItemParams} from '../../shared/models/itemParams';
import {Pagination} from '../../shared/models/pagination';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {FiltersDialogComponent} from '../../shared/dialogs/filters-dialog/filters-dialog.component';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {FilterIcon, PlusIcon, TrashIcon, } from 'primeng/icons';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Card} from 'primeng/card';
import { PrimeIcons } from 'primeng/api';
import {Dialog} from 'primeng/dialog';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-items',
  imports: [
    MatButtonModule,
    // RouterLink,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    // ButtonDirective,
    // Ripple,
    // ButtonIcon,
    // ButtonLabel,
    // PlusIcon,
    // Paginator,
    // Card,
    // Button,
    // TrashIcon,
    // MultiSelect
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  // itemService = inject(ItemService);
  // items?: Pagination<Item>;
  // readonly dialog = inject(MatDialog);
  //
  // categoriesOptions: { label: string, value: string }[] = [];
  // categories: string[] = [];
  //
  // itemParams = new ItemParams();
  //
  // ngOnInit(): void {
  //   this.initializeItems();
  //   this.itemService.getCategories().subscribe(categories => {
  //     this.categories = categories;
  //     this.categoriesOptions = categories.map(cat => ({ label: cat, value: cat }));
  //   });
  // }
  //
  // initializeItems() {
  //   this.itemService.getCategories();
  //   this.loadItems();
  // }
  //
  // loadItems() {
  //   this.itemService.getItems(this.itemParams).subscribe({
  //     next: items => this.items = items,
  //     error: error => console.log(error)
  //   });
  // }
  //
  // deleteItem(id: number) {
  //   this.itemService.deleteItem(id).subscribe({
  //     next: () => {
  //       console.log('item deleted');
  //     },
  //     error: error => console.log(error)
  //   });
  // }
  //
  // openDialog() {
  //   const dialogRef = this.dialog.open(CreateItemComponent);
  // }
  //
  // handlePageEvent($event: PaginatorState) {
  //   this.itemParams.pageNumber = $event.page! + 1;
  //   this.itemParams.pageSize = $event.rows!;
  //   this.loadItems();
  // }
  //
  // onCategoryChange(event: any) {
  //   this.itemParams.categories = event.value;
  //   this.loadItems();
  // }
}
