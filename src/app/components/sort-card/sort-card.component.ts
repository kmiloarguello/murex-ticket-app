import { Component,Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ticketsActions from '../../store/tickets/tickets.actions';


@Component({
  selector: 'app-sort-card',
  templateUrl: './sort-card.component.html',
  styleUrls: ['./sort-card.component.scss']
})
export class SortCardComponent implements OnInit {

  // Information for Sorting DOM
  sortOptionList: any = [
    { id: "sort-by-title", value: "title", title:"Title", checked: true },
    { id: "sort-by-category", value: "category" , title:"Category", checked: false },
    { id: "sort-by-author", value: "author", title:"Author", checked: false },
  ];

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  /**
   * @description This function triggers a dispatch to sort the tickets in the global store
   * @param event onclick
   */
  sortTicketsBy (event) {
    this._store.dispatch(ticketsActions.aSortListOfTickets({ sort: event.target.value }))    
  }

}
