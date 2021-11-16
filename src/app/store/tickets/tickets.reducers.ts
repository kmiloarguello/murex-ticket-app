import { TicketState } from "./tickets.state";
import { Action, createReducer, on } from '@ngrx/store';


import * as TicketsActions from './tickets.actions'

export const initialTicketState: TicketState = {
    // initial state at the beginning of application
    tickets: [],
    isLoading: false,
    error: null,
    originalTickets: [],
    currentTicketID: ""
};

const _ticketsReducer = createReducer(
    initialTicketState,
    on(TicketsActions.aRequestTickets, state => ({ ...state, isLoading: true })),
    on(TicketsActions.aSuccessTickets, (state , { tickets }) => ({ ...state, isLoading: false, tickets })),
    on(TicketsActions.aSetOriginalTickets, (state , { originalTickets }) => ({ ...state, originalTickets })),
    on(TicketsActions.aErrorTickets, (state, {error}) => ({ ...state, error: error.message, isLoading: false })),
    on(TicketsActions.aFilterListOfTickets, (state) => ({ ...state })),
    on(TicketsActions.aSortListOfTickets, (state) => ({ ...state })),
    on(TicketsActions.aSelectTicket, (state, { id }) => ({ ...state, currentTicketID: id })),
    on(TicketsActions.aFilterListOfTicketsByAggregate, (state) => ({ ...state })),
    on(TicketsActions.aCreateANewTicket, (state, { ticket }) => ({ ...state, tickets: [...state.tickets, ticket] })),
    on(TicketsActions.aDeleteTicket, (state, { id }) => ({ ...state, tickets: [...state.tickets.filter((item) => item.id !== id) ] })),
    on(TicketsActions.aUpdateTickets, (state , { tickets }) => ({ ...state, tickets })),
    on(TicketsActions.aEditTicket, (state, { ticket, index }) => {
        const updatedTicket = state.tickets.map((item, i) => {
            if (index === i) return Object.assign({}, item, ticket);
            return item;
        });

        return {...state, tickets: updatedTicket};
    }),
    
  );


export function TicketsReducer ( state: TicketState | undefined, action: Action) {
    return _ticketsReducer(state,action);
}



