import { Component, inject, OnInit } from '@angular/core';
import { FolderService } from '../../core/services/folder.service';
import { Folder } from '../../shared/models/folder';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderComponent } from '../../shared/dialogs/create-folder/create-folder.component';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Card} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {FolderParams} from '../../shared/models/folderParams';
import {Pagination} from '../../shared/models/pagination';
import {Paginator} from 'primeng/paginator';
import {MultiSelect} from 'primeng/multiselect';
import {PlusIcon} from 'primeng/icons';
import {PrimeTemplate} from 'primeng/api';
import {BusyService} from '../../core/services/busy.service';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'app-folder-list',
  imports: [
    ButtonDirective,
    ButtonLabel,
    Ripple,
    Card,
    RouterLink,
    Paginator,
    Skeleton,
  ],
  templateUrl: './folder-list.component.html',
  styleUrl: './folder-list.component.css'
})
export class FolderListComponent implements OnInit {
  private folderService = inject(FolderService);
  readonly dialog = inject(MatDialog);
  busyService = inject(BusyService);

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
    const dialogRef = this.dialog.open(CreateFolderComponent);
  }

  handlePageEvent($event: any) {
    this.folderParams.pageNumber = $event.page! + 1;
    this.folderParams.pageSize = $event.rows!;
    this.loadFolders();
  }
}
