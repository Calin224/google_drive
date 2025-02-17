import {Component, OnInit} from '@angular/core';
import {NgxVortexComponent} from '@omnedia/ngx-vortex';

@Component({
  selector: 'app-home',
  imports: [
    NgxVortexComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  items: string[] = [];
  secondItems: string[] = [];

  ngOnInit() {
    this.items = ["#6EE7B7", "#1c4731"]
    this.secondItems = ["#075534", "#528552"]
  }
}
