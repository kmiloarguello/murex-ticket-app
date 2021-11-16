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

  // Tickets and ticketsOriginal are both arrays of tickets, except that we use tickets for filtering
  // ticketsOriginals keeps no matter the filters applied 
  public tickets$: Observable<Ticket[]>; 
  public ticketsOriginal$: Observable<Ticket[]>;
  ticketsOriginal: Ticket[]; // Array of tickets
  public currentTicketID$: Observable<string>;
  currentTicketID: string; // Ticket ID (selected)
  cardIsActivated: boolean = false; // If a card is selected
  activePopupDelete: boolean = false; // When the user select delete Ticket

  constructor(private _store: Store, private _router: Router) {
    this.tickets$ = this._store.select(ticketsSelectors.selectTickets);
    this.ticketsOriginal$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    this.currentTicketID$ = this._store.select(ticketsSelectors.selectCurrentTicketID);

    this.ticketsOriginal$.subscribe((tickets) => this.ticketsOriginal = tickets);

    this.currentTicketID$.subscribe((id) => {
      this.currentTicketID = id;
      this.cardIsActivated = id.length > 0 ? true : false; // The ID to update the DOM (card colors)
    });
  }

  ngOnInit(): void { 
    // We subscribe only when there is not tickets -> To keep the created/modified tickets
    if (!this.ticketsOriginal || this.ticketsOriginal.length == 0) {
      this._store.dispatch(ticketsActions.aRequestTickets());
    }
    
  }

  /**
   * @description This function switch to /ticket?id=XX when the user has selected a ticket
   * @param id Ticket ID
   */
  editTicket(id: string) {
    if (id.length == 0) return console.warn("Missing ID");
    this._router.navigate(['/ticket'], { queryParams: { id }});
  }

  /**
   * @description Before of deleting a ticket we ask to confirm 
   *              - This function activates a tooltip to ask if the user really wants to delete the ticket
   * @param id Ticket ID
   */
  askForDeletingTicket (id: string) {
    if (id.length == 0) return console.warn("Missing ID");
    this.activePopupDelete = true;
  }

  /**
   * @description When the user confirm the Ticket delete we delete it by its ID
   * @param id Ticket ID
   */
  confirmDeleteTicket (id: string) {
    this._store.dispatch(ticketsActions.aDeleteTicket({ id }));
    this.activePopupDelete = false;
  }

  /**
   * @description It closes the tooltip of confirmation of deleting
   */
  cancelDeleteTicket() {
    this.activePopupDelete = false;
  }
}
