import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/core/models/tickets.models';

/**
 * @description It is triggered when the app starts
 */
export const aRequestTickets = createAction(
  '[CA] Request tickets'
);

/**
 * @description It creates a second array of tickets as "originalTickets"
 */
export const aSetOriginalTickets = createAction(
  '[Ticket] Getting original ticket',
  props<{ originalTickets: Ticket[] }>()
)

/**
 * @description It returns the tickets found in the JSON
 */
export const aSuccessTickets = createAction(
    '[CA] Success tickets',
    props<{ tickets: Ticket[] }>()
);

/**
 * @description It throws an error
 */
export const aErrorTickets = createAction(
    '[CA] Error tickets',
    props<{ error: Error }>()
);

/**
 * @description Filter by category or internal
 */
export const aFilterListOfTickets = createAction(
  '[Tickets] Filtering tickets',
  props<{ filter: string, filtertype: string }>()
);

/**
 * @description Filter by multiple status filter
 */
export const aFilterListOfTicketsByAggregate = createAction(
  '[Tickets] Filtering by aggregation',
  props<{ filters: string[] }>()
)

/**
 * @description Sort the tickets
 */
export const aSortListOfTickets = createAction(
  '[Tickets] Sorting tickets',
  props<{ sort: string }>()
);


/**
 * @description Create a new ticket
 */
export const aCreateANewTicket = createAction(
  '[Tickets] New ticket',
  props<{ ticket: Ticket }>()
)

/**
 * @description Edit a ticket
 */
export const aEditTicket = createAction(
  '[Tickets] Edit Ticket',
  props<{ticket: Ticket, id: string}>()
)


/**
 * @description Delete a Ticket
 */
export const aDeleteTicket = createAction(
  '[Tickets] Delete Ticket',
  props<{id: string}>()
)


/**
 * @description Select the current Ticket by its ID
 */
export const aSelectTicket = createAction(
  '[Tickets] Select current ticket',
  props<{ id: string }>()
)

/**
 * @description Update the tickets after a modification such as filter or sort
 */
export const aUpdateTickets = createAction(
  '[Tickets] Updating tickets',
  props<{ tickets: Ticket[] }>()
);

