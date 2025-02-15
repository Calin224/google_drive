import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { PhotoService } from '../../../core/services/photo.service';
import { UploadModule  } from '@progress/kendo-angular-upload';


@Component({
  selector: 'app-item',
  imports: [
    ReactiveFormsModule,
    MatCard,
    UploadModule
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private photoService = inject(PhotoService);

  private fb = inject(FormBuilder);

  itemId?: number;

  itemForm = this.fb.group({
    name: [''],
    description: [''],
    category: [''],
    photos: [[]]
  })

  item?: Item;

  ngOnInit() {
    this.loadItem();
  }

  loadItem(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.itemId = +id;

    this.itemService.getItem(+id).subscribe({
      next: item => {this.item = item;}
    })
  }

  onUpload(event: any) {
    if (!this.itemId) return;
    const files: FileList = event.files.map((f: any) => f.rawFile);
  
    if (files.length > 0) {
      this.photoService.addPhotos(this.itemId, files).subscribe({
        next: (response) => {
          console.log('Fișiere încărcate cu succes:', response);
          this.loadItem();
        },
        error: (err) => console.error('Eroare la upload:', err)
      });
    }
  }
}