import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IItem } from 'src/app/models/item-model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  isEditMode: boolean = false;
  formTitle: string = 'Create New';
  nextId!: number;
  itemToEdit: IItem | undefined;
  @Output() closeForm = new EventEmitter();

  constructor(private fb: FormBuilder, private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
    this.itemsService.items$.subscribe((items: IItem[]) => {
      this.nextId = items.length + 1;
    });
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required],
      createBY: ['', Validators.required],
    });
  }

  private checkEditMode(): void {
    this.itemsService.isEditMode$.subscribe((value: boolean) => {
      if (value) {
        this.isEditMode = true;
        this.formTitle = 'Edit Item';
        this.itemToEdit = this.itemsService.getItemById();

        this.itemForm = this.fb.group({
          name: [this.itemToEdit?.name, Validators.required],
          color: [this.itemToEdit?.color, Validators.required],
          createBY: [this.itemToEdit?.createBy, Validators.required],
        });
      }
    });
  }

  onSave(): void {
    if (this.itemForm.valid) {
      let createBy: string = this.itemForm.value.createBy;
      let createDate: Date = new Date();
      let lastUpdate: Date =
        this.itemForm.value.lastUpdate === undefined
          ? createDate
          : this.itemForm.value.lastUpdate;

      let id = !this.isEditMode ? this.nextId : this.itemToEdit?.id;
      let savedItemDate: IItem = {
        id: id,
        name: this.itemForm.value.name,
        color: this.itemForm.value.color,
        createDate: new Date(),
        lastUpdate: lastUpdate,
        createBy: createBy,
      };

      if (this.isEditMode) {
        this.itemsService.updateItemById(savedItemDate);
      } else {
        this.itemsService.addItem(savedItemDate);
      }
    } else {
      this.itemForm.markAllAsTouched();
    }

    // if (this.isEditMode) {
    // Implement logic for updating existing item
    // this.itemService.updateItem(this.itemForm.value).subscribe();
    //  } else {
    // Implement logic for creating a new item
    // this.itemService.createItem(this.itemForm.value).subscribe();
    // }
    // this.router.navigate(['/']); // Redirect to the item list after save
  }

  onCancel(e: Event): void {
    e.stopPropagation();
    this.updateEditState();
    this.closeForm.emit('close');
  }

  closeFrom(e: Event) {
    e.stopPropagation();
    this.updateEditState();
    this.closeForm.emit('close');
  }

  updateEditState() {
    this.itemsService.updateIsEditMode(false);
  }
}
