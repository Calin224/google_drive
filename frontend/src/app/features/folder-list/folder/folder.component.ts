import {Component, inject, OnInit} from '@angular/core';
import {FolderService} from '../../../core/services/folder.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Folder} from '../../../shared/models/folder';
import { MatDialog } from '@angular/material/dialog';
import {CreateItemComponent} from '../../../shared/dialogs/create-item/create-item.component';
import {NgFor, NgIf} from '@angular/common';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import { ItemService } from '../../../core/services/item.service';
import { ItemParams } from '../../../shared/models/itemParams';
import { Pagination } from '../../../shared/models/pagination';
import { Item } from '../../../shared/models/item';
import {Card} from 'primeng/card';
import {Paginator} from 'primeng/paginator';
import {MultiSelect} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import {PlusIcon, TrashIcon} from 'primeng/icons';
import {PrimeTemplate} from 'primeng/api';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-folder',
  imports: [
    NgFor,
    ButtonDirective,
    Ripple,
    Card,
    Paginator,
    NgIf,
    MultiSelect,
    FormsModule,
    PlusIcon,
    RouterLink,
    PrimeTemplate,
    Button,
    TrashIcon,
    ButtonIcon,
    IconField,
    InputIcon,
    InputText,
    ButtonLabel
  ],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent implements OnInit{
  private folderService = inject(FolderService);
  private activatedRoute = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private dialog = inject(MatDialog);

  folderId?: number;
  folder?: Folder;

  itemParams = new ItemParams();
  items?: Pagination<Item>;

  categoriesOptions: { label: string, value: string }[] = [];
  categories: string[] = [];

  ngOnInit(): void {
    this.loadFolder();
    this.loadItems();
    this.itemService.getCategories(this.folderId!).subscribe(categories => {
      this.categories = categories;
      this.categoriesOptions = categories.map(cat => ({ label: cat, value: cat }));
    });
  }

  loadFolder(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.folderId = +id;

    this.itemParams.folderId = this.folderId;

    this.folderService.getFolder(this.folderId!).subscribe({
      next: folder => {
        this.folder = folder;
        console.log("Folder", folder);
      }
    })
  }

  loadItems(){
    this.itemService.getItems(this.itemParams).subscribe({
      next: res => { this.items = res }
    })
  }

  openCreateItemDialog() {
    const dialogRef = this.dialog.open(CreateItemComponent);
    dialogRef.componentInstance.folderId = this.folderId!;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadFolder();
        this.loadItems();
      }
    });
  }

  handlePageEvent($event: any): void {
    this.itemParams.pageNumber = $event.page + 1;
    this.itemParams.pageSize = $event.rows;
    this.loadItems();
  }

  onCategoryChange(event: any) {
    this.itemParams.categories = event.value;
    this.loadItems();
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: _ => {
        this.loadItems();
      }
    });
  }

  changeFn(event: any) {
    this.itemParams.search = event;
    this.loadItems();
  }
}
