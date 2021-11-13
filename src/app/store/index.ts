import { TicketsEffects } from "./tickets/tickets.effects";
import { TicketsReducer } from "./tickets/tickets.reducers";
import { TicketState } from "./tickets/tickets.state";


export interface RootState {
    ticket: TicketState
}

export const appReducers = {
    ticket: TicketsReducer
}

export const appEffects = [TicketsEffects];