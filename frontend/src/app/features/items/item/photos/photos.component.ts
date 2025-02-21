import {Component, Input} from '@angular/core';
import {Photo} from '../../../../shared/models/item';
import {Card} from 'primeng/card';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-photos',
  imports: [
    Card,
    Image
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  @Input() photos: Photo[] | undefined;

}
