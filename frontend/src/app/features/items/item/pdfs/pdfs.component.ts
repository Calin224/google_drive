import {Component, inject, Input, input} from '@angular/core';
import { Pdf } from '../../../../shared/models/pdf';
import {Card} from 'primeng/card';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Tooltip} from 'primeng/tooltip';
import {PdfService} from '../../../../core/services/pdf.service';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {BusyService} from '../../../../core/services/busy.service';
import {Skeleton} from 'primeng/skeleton';
import {StyleClass} from 'primeng/styleclass';

@Component({
  selector: 'app-pdfs',
  imports: [
    PdfViewerModule,
  ],
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css',
  providers: [MessageService]
})
export class PdfsComponent {
  @Input() pdfs: Pdf[] | undefined;
  @Input() itemId: number | undefined;
  // private pdfService = inject(PdfService);
  // busyService = inject(BusyService);

  // constructor(private messageService: MessageService) {}


}
