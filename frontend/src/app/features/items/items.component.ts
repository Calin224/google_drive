import {Component, inject, OnInit} from '@angular/core';
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../shared/models/item';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCard, MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CreateItemComponent} from '../../shared/dialogs/create-item/create-item.component';
import {ItemParams} from '../../shared/models/itemParams';
import {Pagination} from '../../shared/models/pagination';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {FiltersDialogComponent} from '../../shared/dialogs/filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-items',
  imports: [
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  itemService = inject(ItemService);
  items?: Pagination<Item>;
  readonly dialog = inject(MatDialog);

  itemParams = new ItemParams();

  ngOnInit(): void {
    this.initializeItems();
  }

  initializeItems(){
    this.itemService.getCategories();
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems(this.itemParams).subscribe({
      next: items => this.items = items,
      error: error => console.log(error)
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.loadItems(),
      error: error => console.log(error)
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateItemComponent);
  }

  openFiltersDialog(){
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedCategories: this.itemParams.categories
      }
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if(res){
          this.itemParams.categories = res.selectedCategories;
          this.loadItems();
        }
      }
    })
  }

  handlePageEvent($event: PageEvent) {
    this.itemParams.pageNumber = $event.pageIndex + 1;
    this.itemParams.pageSize = $event.pageSize;
    this.loadItems();
  }
}
