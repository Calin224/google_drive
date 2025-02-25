import {Component, inject, model, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PhotoService} from '../../../core/services/photo.service';
import {CommonModule} from '@angular/common';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {Card} from 'primeng/card';
import {Image} from 'primeng/image';
import {Button, ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {Toast} from 'primeng/toast';
import {MenuItem, MessageService, PrimeTemplate} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {SpeedDial} from 'primeng/speeddial';
import {PdfService} from '../../../core/services/pdf.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {StyleClass} from 'primeng/styleclass';
import {Tooltip} from 'primeng/tooltip';
import {GalleriaModule} from 'primeng/galleria';
import {Drawer} from 'primeng/drawer';
import {ZipService} from '../../../core/services/zip.service';
import {TableModule} from 'primeng/table';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {EditorService} from '../../../core/services/editor.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Editor} from 'primeng/editor';
import {AccountService} from '../../../core/services/account.service';


@Component({
  selector: 'app-item',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FileUpload,
    Toast,
    Breadcrumb,
    SpeedDial,
    ButtonDirective,
    Card,
    PdfViewerModule,
    PrimeTemplate,
    Ripple,
    StyleClass,
    Tooltip,
    GalleriaModule,
    Image,
    Drawer,
    Button,
    TableModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    Editor,
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
  protected accountService = inject(AccountService);
  private zipService = inject(ZipService);
  private editorService = inject(EditorService);

  itemId?: number;
  item?: Item;

  toggle_item_public?: boolean;

  private fb = inject(FormBuilder);

  editorForm = this.fb.group({
    text: new FormControl()
  })

  constructor(private messageService: MessageService) {}

  visible: boolean = false;
  visibleImages: boolean = false;

  home?: MenuItem;

  items: MenuItem[] | undefined;

  hasEditor?: boolean;
  visibleEditor: boolean = false;

  isPdf = false;
  isImage = false;
  isZip: boolean = false;
  isEditor: boolean = false;

  ngOnInit() {
    this.loadItem();

    this.editorService.hasEditor(this.itemId!).subscribe({
      next: res => {
        this.hasEditor = res;
      }
    });

    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.items = [
      {
        icon: 'pi pi-image',
        command: () => {
          this.isImage = true;
          this.isPdf = false;
          this.isZip = false;
          this.isEditor = false;
        }
      },
      {
        icon: 'pi pi-file-arrow-up',
        command: () => {
          this.isPdf = true;
          this.isImage = false;
          this.isZip = false;
          this.isEditor = false;
        }
      },
      {
        icon: 'pi pi-folder',
        command: () => {
          this.isPdf = false;
          this.isImage = false;
          this.isZip = true;
          this.isEditor = false;
        }
      },
      {
        icon: 'pi pi-pen-to-square',
        command: () => {
          this.isImage = false;
          this.isPdf = false;
          this.isZip = false;
          this.isEditor = true;
        }
      },
      {
        icon: 'pi pi-times',
        command: () => {
          this.isImage = false;
          this.isPdf = false;
          this.isZip = false;
          this.isEditor = false;
        }
      }
    ]
  }

  toggleItemPublic(itemId: number, isPublic: boolean){
    this.itemService.setItemPublic(itemId, isPublic).subscribe({
      next: () => {
        this.toggle_item_public = !this.toggle_item_public;
      },
      error: err => console.log(err)
    })
  }

  loadItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.itemId = +id;

    this.itemService.getItem(+id).subscribe({
      next: item => {
        this.item = item;
        this.toggle_item_public = this.item.isPublic;
        console.log(item.isPublic)
      }
    })
  }

  uploadedFiles: any[] = [];
  uploadedPdfs: any[] = [];
  uploadedZips: any[] = [];

  onUpload(event: any) {
    const files: File[] = event.files;

    if (files.length > 0 && this.itemId) {
      this.photoService.addPhotos(this.itemId, files).subscribe({
        next: _ => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Photo uploaded successfully!',
            life: 3000
          });
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

    if (pdfs.length > 0 && this.itemId) {
      this.pdfService.addPdf(this.itemId, pdfs).subscribe({
        next: _ => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pdf uploaded successfully!',
            life: 3000
          });
          this.loadItem();
        },
        error: err => {
          console.error('Error uploading pdf:', err);
          this.snackService.error('Error uploading pdf');
        }
      });
    }
  }

  onUploadZip(event: FileUploadHandlerEvent) {
    const zips = event.files[0];

    if (zips) {
      this.zipService.uploadZip(this.itemId!, zips).subscribe({
        next: _ => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pdf uploaded successfully!',
            life: 3000
          });
          this.loadItem();
        }
      })
    }
  }

  deletePdf(pdfId: number) {
    this.pdfService.deletePdf(pdfId, this.itemId!).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Pdf deleted successfully!',
          life: 3000
        });
        this.loadItem();
      }
    });
  }

  deleteImage(id: number) {
    this.photoService.deletePhoto(this.itemId!, id).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Photo deleted successfully!',
          life: 3000
        });
        this.loadItem();
      }
    })
  }


  deleteZip(id: number) {
    this.zipService.deleteZip(id).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Zip deleted successfully!',
          life: 3000
        });
        this.loadItem();
      }
    })
  }

  uploadEditorText() {
    const textValue = this.editorForm.get('text')?.value || '';

    this.editorService.uploadEditorText(this.itemId!, textValue).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Editor text saved!',
          life: 3000
        });
        this.loadItem();
      },
      error: error => {
        console.log(error.Message)
      }
    })
  }

  editEditorText() {
    const textValue = this.editorForm.get('text')?.value || '';
    this.editorService.editEditorText(this.itemId!, textValue).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Editor text updated!',
          life: 3000
        });
        this.loadItem();
        this.visibleEditor = false;
      }
    })
  }

  deleteEditorText() {
    this.editorService.deleteEditorText(this.itemId!).subscribe({
      next: _ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Editor text cleared!',
          life: 3000
        });
        this.loadItem();
      }
    })
  }

  cancelEditorEdit() {
    this.visibleEditor = false;
    this.loadItem();
  }
}
