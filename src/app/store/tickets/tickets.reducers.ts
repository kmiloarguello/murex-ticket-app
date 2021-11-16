import { TicketState } from "./tickets.state";
import { Action, createReducer, on } from '@ngrx/store';


import * as TicketsActions from './tickets.actions'

export const initialTicketState: TicketState = {
    // initial state at the beginning of application
    tickets: [],
    isLoading: false,
    error: null,
    originalTickets: [],
    currentTicket: null,
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
    on(TicketsActions.aCreateANewTicket, (state, { ticket }) => ({ ...state, tickets: [...state.tickets, ticket], originalTickets: [...state.originalTickets, ticket] } )),
    on(TicketsActions.aDeleteTicket, (state, { id }) => ({ ...state, tickets: [...state.tickets.filter((item) => item.id !== id) ], originalTickets: [...state.originalTickets.filter((item) => item.id !== id) ] })),
    on(TicketsActions.aUpdateTickets, (state , { tickets }) => ({ ...state, tickets })),
    on(TicketsActions.aEditTicket, (state, { ticket, id }) => {
        
        const updatedTickets = state.tickets.map((item) => {
            if (item.id === id) return Object.assign({}, item, ticket);
            return item;
        });
        const updatedOrignalTickets = state.originalTickets.map((item) => {
            if (item.id === id) return Object.assign({}, item, ticket);
            return item;
        });

        return {...state, tickets: updatedTickets, originalTickets: updatedOrignalTickets};
    }),
    
  );


export function TicketsReducer ( state: TicketState | undefined, action: Action) {
    return _ticketsReducer(state,action);
}



