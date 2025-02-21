import {Component, inject, OnInit} from '@angular/core';
import {ItemService} from '../../../core/services/item.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {Listbox} from 'primeng/listbox';

@Component({
  selector: 'app-filters-dialog',
  imports: [
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule,
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent{
  protected itemService = inject(ItemService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedCategories: string[] = this.data.selectedCategories;

  applyFilters() {
    this.dialogRef.close({
      selectedCategories: this.selectedCategories
    })
  }
}
