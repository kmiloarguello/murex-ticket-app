import { Component,Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/tickets.models';
import { Store } from '@ngrx/store';
import * as ticketsActions from '../../store/tickets/tickets.actions';


@Component({
  selector: 'app-sort-card',
  templateUrl: './sort-card.component.html',
  styleUrls: ['./sort-card.component.scss']
})
export class SortCardComponent implements OnInit {

  sortOptionList: any = [
    { id: "sort-by-title", value: "title", title:"Title", checked: true },
    { id: "sort-by-category", value: "category" , title:"Category", checked: false },
    { id: "sort-by-author", value: "author", title:"Author", checked: false },
  ];

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  sortTicketsBy (event) {
    this._store.dispatch(ticketsActions.sortListOfTickets({ sort: event.target.value }))    
  }

}
