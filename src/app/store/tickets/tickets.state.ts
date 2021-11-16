// Interface

import { Ticket } from "src/app/core/models/tickets.models";

export interface TicketState {
    tickets: Ticket[]; // Array of tickets
    isLoading: boolean; // Helper
    error: any;
    originalTickets: Ticket[]; // Array of tickets without modifications when filtering or sort
    currentTicket: Ticket; 
    currentTicketID: string;
}
