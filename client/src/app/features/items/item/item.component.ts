import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';

@Component({
  selector: 'app-item',
  imports: [

  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private itemService = inject(ItemService);

  item?: Item;

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    this.itemService.getItem(+id).subscribe({
      next: item => {this.item = item;}
    })
  }

  
}