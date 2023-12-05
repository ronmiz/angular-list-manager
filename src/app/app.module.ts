import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListPageComponent } from './components/item-list-page/item-list-page.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ItemListPageComponent,
    ListItemComponent,
    ItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ItemListPageComponent, ItemFormComponent],
})
export class AppModule {}
