import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';
import {ReactiveFormsModule} from '@angular/forms';
import {PhotoService} from '../../../core/services/photo.service';
import {CommonModule} from '@angular/common';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {Card} from 'primeng/card';
import {Image} from 'primeng/image';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {FileUpload} from 'primeng/fileupload';
import {Toast} from 'primeng/toast';
import {MenuItem, MenuItemCommandEvent, MessageService} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {SpeedDial} from 'primeng/speeddial';
import {PdfService} from '../../../core/services/pdf.service';
import {AccountService} from '../../../core/services/account.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-item',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Card,
    Image,
    ButtonDirective,
    Ripple,
    FileUpload,
    Toast,
    Breadcrumb,
    SpeedDial,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [MessageService]
})
export class ItemComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private photoService = inject(PhotoService);
  private pdfService = inject(PdfService);
  private snackService = inject(SnackbarService);
  private accountService = inject(AccountService);

  itemId?: number;
  item?: Item;
  constructor(private messageService: MessageService) {}

  home?: MenuItem;

  items: MenuItem[] | undefined;

  isPdf = false;
  isImage = false;

  ngOnInit() {
    this.loadItem();
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.items = [
      {
        icon: 'pi pi-image',
        command: () => {
          this.isImage = true;
          this.isPdf = false;
        }
      },
      {
        icon: 'pi pi-file-arrow-up',
        command: () => {
          this.isPdf = true;
          this.isImage = false;
        }
      },
      {
        icon: 'pi pi-times',
        command: () => {
          this.isImage = false;
          this.isPdf = false;
        }
      }
    ]
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

  loadItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.itemId = +id;

    this.itemService.getItem(+id).subscribe({
      next: item => {
        this.item = item;
        console.log('Item:', item);
      }
    })
  }

  uploadedFiles: any[] = [];
  uploadedPdfs: any[] = [];

  onUpload(event: any) {
    const files: File[] = event.files;

    if (files.length > 0 && this.itemId) {
      this.photoService.addPhotos(this.itemId, files).subscribe({
        next: _ => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Photo uploaded successfully!', life: 3000 });
          this.loadItem();
        },
        error: err => {
          console.error('Error uploading photos:', err);
          this.snackService.error('Error uploading photos');
        }
      });
    }
  }

  onUploadPdf(event: any) {
    const pdfs: File[] = event.files;

    if(pdfs.length > 0 && this.itemId){
      this.pdfService.addPdf(this.itemId, pdfs).subscribe({
        next: _ => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pdf uploaded successfully!', life: 3000 });
          this.loadItem();
        },
        error: err => {
          console.error('Error uploading pdf:', err);
          this.snackService.error('Error uploading pdf');
        }
      });
    }
  }

  deletePdf(pdfId: number) {
    this.pdfService.deletePdf(pdfId, this.itemId!).subscribe({
      next: _ => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pdf deleted successfully!', life: 3000 });
        this.loadItem();
      }
    });
  }

  downloadPdf(pdf: any) {
    const byteCharacters = atob(pdf.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
  }

}
