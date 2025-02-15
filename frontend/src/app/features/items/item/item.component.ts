import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardHeader, MatCardImage } from '@angular/material/card';
import { PhotoService } from '../../../core/services/photo.service';
import { UploadModule  } from '@progress/kendo-angular-upload';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AddImagesComponent} from '../../../shared/dialogs/add-images/add-images.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  imports: [
    ReactiveFormsModule,
    MatCard,
    UploadModule,
    MatIcon,
    MatCardHeader,
    MatCardImage,
    MatCardActions,
    CommonModule,
    MatIconButton,
    MatButton
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private photoService = inject(PhotoService);
  private snackService = inject(SnackbarService);
  private router = inject(Router);

  readonly dialog = inject(MatDialog);

  itemId?: number;

  item?: Item;

  ngOnInit() {
    this.loadItem();
  }

  deletePhoto(photoId: number) {
    if (!this.itemId) return;
    this.photoService.deletePhoto(this.itemId, photoId).subscribe({
      next: () => {
        this.snackService.success("Photo delete successfully!")
        this.loadItem();
      },
      error: (err) => console.error('Error deleting photo:', err)
    });
  }

  loadItem(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.itemId = +id;

    this.itemService.getItem(+id).subscribe({
      next: item => {this.item = item;}
    })
  }

  openAddComponentDialog(){
    const dialogRef = this.dialog.open(AddImagesComponent, {
      minWidth: '500px',
      data: {
        itemId: this.itemId
      }
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if(res){
          this.snackService.success("Photos added successfully!");
          this.loadItem();
        }
      }
    })
  }
}
