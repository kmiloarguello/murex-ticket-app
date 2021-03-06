import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from './tickets.state';

export const getTicketsFeatureState = createFeatureSelector('ticket');

export const selectTickets = createSelector(
    getTicketsFeatureState,
    (state: TicketState) => state.tickets
)

export const selectOriginalTickets = createSelector(
    getTicketsFeatureState,
    (state: TicketState) => state.originalTickets
)

export const selectCurrentTicketID = createSelector(
    getTicketsFeatureState,
    (state: TicketState) => state.currentTicketID
)

export const selectCurrentTicket = createSelector (
    getTicketsFeatureState,
    (state: TicketState) => state.currentTicket
)