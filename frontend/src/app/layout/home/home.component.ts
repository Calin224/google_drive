import { Component } from '@angular/core';
import {NgxAuroraComponent} from '@omnedia/ngx-aurora';
import {NgxNeonUnderlineComponent} from '@omnedia/ngx-neon-underline';

@Component({
  selector: 'app-home',
  imports: [
    NgxAuroraComponent,
    NgxNeonUnderlineComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
