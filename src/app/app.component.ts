import { Component, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { IItem } from './models/item-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private itemService: ItemsService) {}
  ngOnInit() {
    this.itemService.getItems().subscribe((itemData: IItem[]) => {
      this.itemService.updateCurrentItems(itemData);
    });
  }
}
