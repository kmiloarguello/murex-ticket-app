// Interface

import { Ticket } from "src/app/core/models/tickets.models";

export interface TicketState {
    tickets: Ticket[];
    isLoading: boolean;
    error: any;
    originalTickets: Ticket[];
}
