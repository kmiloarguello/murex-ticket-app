import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/core/models/tickets.models';

export const aRequestTickets = createAction(
  '[CA] Request tickets'
);

export const aSetOriginalTickets = createAction(
  '[Ticket] Getting original ticket',
  props<{ originalTickets: Ticket[] }>()
)

export const aSuccessTickets = createAction(
    '[CA] Success tickets',
    props<{ tickets: Ticket[] }>()
);

export const aErrorTickets = createAction(
    '[CA] Error tickets',
    props<{ error: Error }>()
);

export const aFilterListOfTickets = createAction(
  '[Tickets] Filtering tickets',
  props<{ filter: string, filtertype: string }>()
);

export const aFilterListOfTicketsByAggregate = createAction(
  '[Tickets] Filtering by aggregation',
  props<{ filters: string[] }>()
)

export const aSortListOfTickets = createAction(
  '[Tickets] Sorting tickets',
  props<{ sort: string }>()
);

export const aCreateANewTicket = createAction(
  '[Tickets] New ticket',
  props<{ ticket: Ticket }>()
)

export const aEditTicket = createAction(
  '[Tickets] Edit Ticket',
  props<{ticket: Ticket, id: string}>()
)

export const aDeleteTicket = createAction(
  '[Tickets] Delete Ticket',
  props<{id: string}>()
)

export const aSelectTicket = createAction(
  '[Tickets] Select current ticket',
  props<{ id: string }>()
)

export const aUpdateTickets = createAction(
  '[Tickets] Updating tickets',
  props<{ tickets: Ticket[] }>()
);

export const aGoToTicket = createAction(
  '[Tickets] go to tickets',
  props<{ path: any[], queryParams?: object }>()
)
