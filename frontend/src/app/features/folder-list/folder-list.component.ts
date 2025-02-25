import { Component, inject, OnInit } from '@angular/core';
import { FolderService } from '../../core/services/folder.service';
import { Folder } from '../../shared/models/folder';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderComponent } from '../../shared/dialogs/create-folder/create-folder.component';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Card} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {FolderParams} from '../../shared/models/folderParams';
import {Pagination} from '../../shared/models/pagination';
import {Paginator} from 'primeng/paginator';
import {MultiSelect} from 'primeng/multiselect';
import {PlusIcon, TrashIcon} from 'primeng/icons';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {BusyService} from '../../core/services/busy.service';
import {Skeleton} from 'primeng/skeleton';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-folder-list',
  imports: [
    ButtonLabel,
    Card,
    RouterLink,
    Paginator,
    Skeleton,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    Button,
    PrimeTemplate,
    ButtonIcon,
    TrashIcon,
  ],
  templateUrl: './folder-list.component.html',
  styleUrl: './folder-list.component.css',
  providers: [MessageService]
})
export class FolderListComponent implements OnInit {
  private folderService = inject(FolderService);
  readonly dialog = inject(MatDialog);
  busyService = inject(BusyService);

  constructor(private messageService: MessageService) { }

  folders?: Pagination<Folder>;

  folderParams = new FolderParams();

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders(){
    this.folderService.getFolders(this.folderParams).subscribe({
      next: folders => this.folders = folders
    })
  }

  deleteFolder(itemId: number){
    this.folderService.deleteFolder(itemId).subscribe({
      next: _ => {
        console.log("Folder deleted");
        this.loadFolders();
      }
    })
  }

  openDialog() {
    this.dialog.open(CreateFolderComponent);
  }

  handlePageEvent($event: any) {
    this.folderParams.pageNumber = $event.page! + 1;
    this.folderParams.pageSize = $event.rows!;
    this.loadFolders();
  }

  changeFn(event: any) {
    this.folderParams.search = event;
    this.loadFolders();
  }
}
