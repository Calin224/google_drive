import {Component, inject, OnInit} from '@angular/core';
import {ItemService} from '../../../core/services/item.service';
import {Item} from '../../../shared/models/item';
import {Button, ButtonIcon} from 'primeng/button';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';
import {TrashIcon} from 'primeng/icons';

@Component({
  selector: 'app-public-items',
  imports: [
    Card,
    PrimeTemplate,
    RouterLink,
  ],
  templateUrl: './public-items.component.html',
  styleUrl: './public-items.component.css'
})
export class PublicItemsComponent implements OnInit{
  private itemService = inject(ItemService);
  items?: Item[];

  ngOnInit() {
    this.loadItems();
  }

  loadItems(){
    this.itemService.getPublicItemsForUser().subscribe({
      next: items => this.items = items
    })
  }

}
