import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/models/item-model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  obj: IItem = {
    id: 0,
    name: '',
    color: '',
    createBy: '',
    createDate: new Date(),
    lastUpdate: new Date(),
  };

  @Input() itemData!: IItem;
}
