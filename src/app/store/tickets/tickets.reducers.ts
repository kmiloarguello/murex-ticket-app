import { TicketState } from "./tickets.state";
import { Action, createReducer, on } from '@ngrx/store';


import * as TicketsActions from './tickets.actions'

export const initialTicketState: TicketState = {
    // initial state at the beginning of application
    tickets: [],
    isLoading: false,
    error: null,
    originalTickets: []
};

const _ticketsReducer = createReducer(
    initialTicketState,
    on(TicketsActions.requestTickets, state => ({ ...state, isLoading: true })),
    on(TicketsActions.successTickets, (state , { tickets }) => ({ ...state, isLoading: false, tickets })),
    on(TicketsActions.setOriginalTicket, (state , { originalTickets }) => ({ ...state, originalTickets })),
    on(TicketsActions.errorTickets, (state, {error}) => ({ ...state, error: error.message, isLoading: false })),
    on(TicketsActions.filterListOfTickets, (state) => ({ ...state })),
    on(TicketsActions.sortListOfTickets, (state) => ({ ...state })),
    on(TicketsActions.filterListOfTicketsByAggregate, (state) => ({ ...state })),
    on(TicketsActions.updateTickets, (state , { tickets }) => ({ ...state, tickets })),
  );


export function TicketsReducer ( state: TicketState | undefined, action: Action) {
    return _ticketsReducer(state,action);
}



