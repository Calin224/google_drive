import {Component, inject, Input} from '@angular/core';
import {PhotoService} from '../../../core/services/photo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-add-images',
  imports: [
    MatCard
  ],
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.css'
})
export class AddImagesComponent {
  private photoService = inject(PhotoService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<AddImagesComponent>);
  data = inject(MAT_DIALOG_DATA);

  itemId: number = this.data.itemId;

  // onUpload(event: any) {
  //   if (!this.itemId) return;
  //   const files: FileList = event.files.map((f: any) => f.rawFile);
  //
  //   if (files.length > 0) {
  //     this.photoService.addPhotos(this.itemId, files).subscribe({
  //       next: _ => {
  //         this.router.navigateByUrl("/item/" + this.itemId);
  //         this.dialogRef.close();
  //       }
  //     });
  //   }
  // }
}
