import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { iTicketsList, Ticket } from 'src/app/core/models/tickets.models';
import * as ticketsActions from '../../store/tickets/tickets.actions';
import * as ticketsSelectors from '../../store/tickets/tickets.selectors';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public tickets$: Observable<Ticket[]>;

  constructor(private _store: Store) {
    this.tickets$ = this._store.select(ticketsSelectors.selectTickets);
  }

  ngOnInit(): void { 
    this._store.dispatch(ticketsActions.requestTickets());
  }

}
