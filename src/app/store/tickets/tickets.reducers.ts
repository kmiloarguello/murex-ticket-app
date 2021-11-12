import { TicketState } from "./tickets.state";

import { Action, createReducer } from '@ngrx/store';


export const initialTicketState: TicketState = {
    // initial state at the beginning of application
    tickets: []
};

const _ticketsReducer = createReducer(initialTicketState);

export function TicketsReducer ( state: TicketState | undefined, action: Action) {
    return _ticketsReducer(state,action);
}



