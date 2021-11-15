import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/core/models/tickets.models';

export const requestTickets = createAction(
  '[CA] Request tickets'
);

export const setOriginalTicket = createAction(
  '[Ticket] Getting original ticket',
  props<{ originalTickets: Ticket[] }>()
)

export const successTickets = createAction(
    '[CA] Success tickets',
    props<{ tickets: Ticket[] }>()
);

export const errorTickets = createAction(
    '[CA] Error tickets',
    props<{ error: Error }>()
);

export const filterListOfTickets = createAction(
  '[Tickets] Filtering tickets',
  props<{ filter: string, filtertype: string }>()
);

export const filterListOfTicketsByAggregate = createAction(
  '[Tickets] Filtering by aggregation',
  props<{ filters: string[] }>()
)

export const sortListOfTickets = createAction(
  '[Tickets] Sorting tickets',
  props<{ sort: string }>()
);

export const createANewTicket = createAction(
  '[Tickets] Creating ticket',
  props<{ ticket: Ticket[] }>()
)

export const updateTickets = createAction(
  '[Tickets] Updating tickets',
  props<{ tickets: Ticket[] }>()
);
