import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from './tickets.state';

export const getTicketsFeatureState = createFeatureSelector<TicketState>('tickets');

export const selectTickets = createSelector(
    getTicketsFeatureState,
    (state: TicketState) => state.ticketsdata
)
