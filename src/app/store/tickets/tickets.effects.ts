import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ticketsActions from './tickets.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from "src/app/app.service";

@Injectable()
export class TicketsEffects {
    constructor(private actions$: Actions, private _ticketsService: AppService) {}

    requestTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.requestTickets),
      switchMap((_) =>
        this._ticketsService.getTickets().pipe(
          map((ticketsdata: any) => {
            return ticketsActions.successTickets({ ticketsdata });
          }),
          catchError((error) => {
            return of(ticketsActions.errorTickets({ error }));
          })
        )
      )
    )
  );
}

