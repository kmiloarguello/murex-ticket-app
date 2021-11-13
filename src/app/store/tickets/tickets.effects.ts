import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ticketsActions from './tickets.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from "src/app/app.service";
import { iTicketsList, Tickets } from "src/app/core/models/tickets.models";

@Injectable()
export class TicketsEffects {
    constructor(private actions$: Actions, private _ticketsService: AppService) {}

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
}

