// Interface

import { iTicketsList } from "src/app/core/models/tickets.models";

export interface TicketState {
    ticketsdata: iTicketsList[];
    isLoading: boolean;
    error: any;
}
