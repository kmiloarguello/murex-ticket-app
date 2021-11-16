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
  @Input() public ticket: Ticket;
  isCardActive: boolean = false;

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

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
