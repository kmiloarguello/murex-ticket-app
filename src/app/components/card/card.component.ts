import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket } from 'src/app/core/models/tickets.models';
import * as ticketsActions from '../../store/tickets/tickets.actions';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public ticket: Ticket; // Current Ticket
  isCardActive: boolean = false; // If the user has clicked over the card

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  /**
   * @description This function udpates a store variable called id with data if the user has clicked on the card
   *              - Otherwise the global store variable id will remain empty
   *              - It uses a card active (boolean) variable to update the DOM
   * @param event Event on Click
   * @param id Ticket id
   */
  selectCard(event:any, id: string) {
    if (!this.isCardActive) {
      this.isCardActive = true;
      this._store.dispatch(ticketsActions.aSelectTicket({ id }));
    } else {
      this.isCardActive = false;
      this._store.dispatch(ticketsActions.aSelectTicket({ id: "" }));
    }
  }

}
