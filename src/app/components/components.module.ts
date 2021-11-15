import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { SortCardComponent } from './sort-card/sort-card.component';

@NgModule({
  declarations: [CardComponent, ListComponent, SortCardComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent, ListComponent, SortCardComponent]
})
export class ComponentsModule { }
