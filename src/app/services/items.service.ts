import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItem } from '../models/item-model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = '../../../assets/items.json';

  constructor(private http: HttpClient) {}

  private _items$ = new BehaviorSubject<IItem[]>([]);
  readonly items$ = this._items$.asObservable();

  private _isEditMode$ = new BehaviorSubject<boolean>(false);
  readonly isEditMode$ = this._isEditMode$.asObservable();

  private _idItemEdit$ = new BehaviorSubject<number>(0);
  readonly idItemEdit$ = this._idItemEdit$.asObservable();

  updateCurrentItems(items: IItem[]) {
    this._items$.next(items);
  }

  updateIsEditMode(isEditState: boolean) {
    this._isEditMode$.next(isEditState);
  }
  updateCurrentIdEditItem(isEditState: number) {
    this._idItemEdit$.next(isEditState);
  }

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addItem(item: IItem) {
    let currentItems = this._items$.getValue();

    currentItems.push(item);
    this.updateCurrentItems(currentItems);
  }

  getItemById() {
    let itemArr: IItem[] = this._items$.getValue();
    return itemArr.find((item) => item.id === this._idItemEdit$.value);
  }

  updateItemById(newItem: IItem) {
    let itemArr: IItem[] = this._items$.getValue();
    const index = itemArr.findIndex((item) => item.id === newItem.id);

    if (index !== -1) {
      itemArr[index] = newItem;
      this.updateCurrentItems(itemArr);
    } else {
      console.error('Object with id 2 not found');
    }

    // return itemArr.find((item) => item.id === this._idItemEdit$.value);
  }
}
