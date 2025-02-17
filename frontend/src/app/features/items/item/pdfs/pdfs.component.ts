import {Component, input} from '@angular/core';
import { Pdf } from '../../../../shared/models/pdf';

@Component({
  selector: 'app-pdfs',
  imports: [],
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css'
})
export class PdfsComponent {
  pdfs = input<Pdf[] | undefined>(undefined);
}
