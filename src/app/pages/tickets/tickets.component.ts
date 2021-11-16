import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/core/models/tickets.models';
import * as ticketsActions from '../../store/tickets/tickets.actions';
import * as ticketsSelectors from '../../store/tickets/tickets.selectors';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public tickets$: Observable<Ticket[]>;
  public ticketsOriginal$: Observable<Ticket[]>;
  public currentTicketID$: Observable<string>;
  currentTicketID: string;
  cardIsActivated: boolean = false;

  constructor(private _store: Store) {
    this.tickets$ = this._store.select(ticketsSelectors.selectTickets);
    this.ticketsOriginal$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    this.currentTicketID$ = this._store.select(ticketsSelectors.selectCurrentTicketID);

    this.currentTicketID$.subscribe((item) => {
      this.currentTicketID = item;
      this.cardIsActivated = item.length > 0 ? true : false;
    });
  }

  ngOnInit(): void { 
    this._store.dispatch(ticketsActions.aRequestTickets());

    
  }
}
