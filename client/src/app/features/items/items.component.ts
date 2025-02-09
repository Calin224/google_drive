import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../shared/models/item';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {CreateItemComponent} from '../../shared/dialogs/create-item/create-item.component';

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
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  private itemService = inject(ItemService);
  items: Item[] = [];
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.itemService.getItems().subscribe({
      next: items => this.items = items,
      error: error => console.log(error)
    });
  }

  deleteItem(id: number){
    this.itemService.deleteItem(id).subscribe({
      next: () => this.loadItems(),
      error: error => console.log(error)
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateItemComponent);
  }
}
