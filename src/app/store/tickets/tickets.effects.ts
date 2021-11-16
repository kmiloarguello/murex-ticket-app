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
        ofType(ticketsActions.aRequestTickets),
        switchMap((_) => 
          this._ticketsService.getTickets().pipe(
            map((res: Tickets) => {
              const { tickets } = res;
              this._store.dispatch(ticketsActions.aSetOriginalTickets({ originalTickets: tickets }));
              return ticketsActions.aSuccessTickets({ tickets });
            }),
            catchError((error) => {
              return of(ticketsActions.aErrorTickets({ error }));
            })
          )
        )
      )    
    );


    filterListOfTickets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ticketsActions.aFilterListOfTickets),
        withLatestFrom(this._store.select(ticketsSelectors.selectOriginalTickets)),
        switchMap(([{filter, filtertype}, tickets]) => 
          this._ticketsService.filterTickets(filter, tickets, filtertype).pipe(
            map((res: Ticket[] ) => {
              const tickets = res;
              return ticketsActions.aUpdateTickets({ tickets });
            }),
          )
        )
      )    
    );

    filterListOfTicketsByAggregate$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ticketsActions.aFilterListOfTicketsByAggregate),
        withLatestFrom(this._store.select(ticketsSelectors.selectOriginalTickets)),
        switchMap(([{filters}, tickets]) => 
          {
            return this._ticketsService.filterAggregatedTickets(filters, tickets).pipe(
            map((res: Ticket[] ) => {
              const tickets = res;
              return ticketsActions.aUpdateTickets({ tickets });
            }),
          )}
        )
      )    
    );

    sortListOfTickets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ticketsActions.aSortListOfTickets),
        withLatestFrom(this._store.select(ticketsSelectors.selectOriginalTickets)),
        switchMap(([{ sort }, tickets]) => 
          this._ticketsService.sortTickets(sort, tickets).pipe(
            map((res: Ticket[] ) => {
              const tickets = res;
              return ticketsActions.aUpdateTickets({ tickets });
            }),
          )
        )
      )    
    );

    /*
    setCurrentTicket$ = createEffect(() => this.actions$.pipe(
      ofType(ticketsActions.aSelectTicket),
      withLatestFrom(this._store.select(ticketsSelectors.selectCurrentTicket)),
      switchMap(([{id}]) => {
        return this.
      })
    ))*/


}

