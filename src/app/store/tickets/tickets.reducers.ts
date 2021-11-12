import { TicketState } from "./tickets.state";
import { Action, createReducer, on } from '@ngrx/store';


import * as TicketsActions from './tickets.actions'

export const initialTicketState: TicketState = {
    // initial state at the beginning of application
    ticketsdata: [],
    isLoading: false,
    error: null
};

const _ticketsReducer = createReducer(
    initialTicketState,
    on(TicketsActions.requestTickets, state => ({ ...state, isLoading: true })),
    on(TicketsActions.successTickets, (state , { ticketsdata }) => ({ ...state, isLoading: false, ticketsdata })),
    on(TicketsActions.errorTickets, (state, {error}) => ({ ...state, error: error.message, isLoading: false })),
  );


export function TicketsReducer ( state: TicketState | undefined, action: Action) {
    return _ticketsReducer(state,action);
}



