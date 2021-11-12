import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ticketsActions from '../../store/tickets/tickets.actions';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(ticketsActions.requestTickets());
  }

}
