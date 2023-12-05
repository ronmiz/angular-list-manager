import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/models/item-model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-list-page',
  templateUrl: './item-list-page.component.html',
  styleUrls: ['./item-list-page.component.scss'],
})
export class ItemListPageComponent implements OnInit {
  items: IItem[] = [];
  showForm: boolean = false;
  pageTitle: string = 'Management Tool';

  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.itemService.items$.subscribe((dataItems: IItem[]) => {
      this.items = dataItems;
    });
  }
  addItem() {
    this.showForm = !this.showForm;
  }
  selectItem(e: Event, item: IItem) {
    this.itemService.updateIsEditMode(true);
    this.itemService.updateCurrentIdEditItem(item.id as number);
    this.addItem();
  }
}
