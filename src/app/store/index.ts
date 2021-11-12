import { TicketsEffects } from "./tickets/tickets.effects";
import { TicketsReducer } from "./tickets/tickets.reducers";
import { TicketState } from "./tickets/tickets.state";


export interface RootState {
    tickets: TicketState
}

export const appReducers = {
    tickets: TicketsReducer
}

export const appEffects = [TicketsEffects];