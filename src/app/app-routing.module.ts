import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListPageComponent } from './components/item-list-page/item-list-page.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

const routes: Routes = [
  { path: '', component: ItemListPageComponent },
  { path: 'new', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
