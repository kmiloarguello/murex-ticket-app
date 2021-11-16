import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ticketsOriginal: Ticket[];
  public currentTicketID$: Observable<string>;
  currentTicketID: string;
  cardIsActivated: boolean = false;
  activePopupDelete: boolean = false;

  constructor(private _store: Store, private _router: Router) {
    this.tickets$ = this._store.select(ticketsSelectors.selectTickets);
    this.ticketsOriginal$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    this.currentTicketID$ = this._store.select(ticketsSelectors.selectCurrentTicketID);

    this.ticketsOriginal$.subscribe((tickets) => this.ticketsOriginal = tickets);

    this.currentTicketID$.subscribe((item) => {
      this.currentTicketID = item;
      this.cardIsActivated = item.length > 0 ? true : false;
    });
  }

  ngOnInit(): void { 
    if (!this.ticketsOriginal || this.ticketsOriginal.length == 0) {
      this._store.dispatch(ticketsActions.aRequestTickets());
    }
    
  }

  editTicket(id: string) {
    if (id.length == 0) return console.warn("Missing ID");
    this._router.navigate(['/ticket'], { queryParams: { id }});
  }

  askForDeletingTicket (id: string) {
    if (id.length == 0) return console.warn("Missing ID");
    this.activePopupDelete = true;
  }

  confirmDeleteTicket (id: string) {
    this._store.dispatch(ticketsActions.aDeleteTicket({ id }));
    this.activePopupDelete = false;
  }

  cancelDeleteTicket() {
    this.activePopupDelete = false;
  }
}
