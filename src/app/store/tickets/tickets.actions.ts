import { createAction, props } from '@ngrx/store';
import { iTicketsList } from 'src/app/core/models/tickets.models';

export const requestTickets = createAction(
  '[CA] Request tickets'
);

export const successTickets = createAction(
    '[CA] Success tickets',
    props<{ tickets: iTicketsList[] }>()
)

export const errorTickets = createAction(
    '[CA] Error tickets',
    props<{ error: Error }>()
)

