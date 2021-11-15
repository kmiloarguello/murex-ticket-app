import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ticketsActions from './tickets.actions';
import { map, switchMap, catchError, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from "src/app/app.service";
import { Tickets, Ticket } from "src/app/core/models/tickets.models";
import { Store } from "@ngrx/store";
import * as ticketsSelectors from '../../store/tickets/tickets.selectors';


@Injectable()
export class TicketsEffects {
    constructor(private actions$: Actions, private _ticketsService: AppService, private _store: Store) {}

    requestTickets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ticketsActions.requestTickets),
        switchMap((_) => 
          this._ticketsService.getTickets().pipe(
            map((res: Tickets) => {
              const { tickets } = res;
              return ticketsActions.successTickets({ tickets });
            }),
            catchError((error) => {
              return of(ticketsActions.errorTickets({ error }));
            })
          )
        )
      )    
    );


    filterListOfTickets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ticketsActions.filterListOfTickets),
        withLatestFrom(this._store.select(ticketsSelectors.selectTickets)),
        switchMap(([{filter, filtertype}, tickets]) => 
          this._ticketsService.filterTickets(filter, tickets, filtertype).pipe(
            map((res: Ticket[] ) => {
              const tickets = res;
              return ticketsActions.updateTickets({ tickets });
            }),
          )
        )
      )    
    );


}

