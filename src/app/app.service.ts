import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tickets, Ticket } from './core/models/tickets.models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private readonly http: HttpClient) { }

  public getTickets(): Observable<Tickets> {
    return this.http.get<Tickets>('assets/tickets.json');
  }


  public filterTickets(filter: string, tickets: Ticket[], filtertype: string = "category"): Observable<Ticket[]> {
    let updateTickets: Ticket[] = tickets;
    let _updateTickets = updateTickets.filter((ticket) => new RegExp(filter,"ig").test(ticket[filtertype]));

    return of(_updateTickets);
  }




  public filterAggregatedTickets (filters: string[], tickets: Ticket[]): Observable<Ticket[]> {
    let updateTickets: Ticket[] = tickets;

    if ( filters.length == 0) return of(updateTickets);

    let filteredTickets: Ticket[] = [];

    filters.map((filter) => {
      let ticketsByStatus = updateTickets.filter((ticket) => filter === ticket.status) // 
      ticketsByStatus.map((status) => {
        filteredTickets.push(status);
      });
    });

    return of(filteredTickets);
  }






  public sortTickets(sort: string, tickets: Ticket[]): Observable<Ticket[]> {
    let updateTickets: Ticket[] = tickets;

    console.log("sorting by " + sort + " ...");

    let _presorted = updateTickets.slice(0);
    let sortedTickets = _presorted.sort((a,b) => (a[sort] < b[sort] ? -1 : 1));
    
    console.log("sorted")

    return of(sortedTickets)
  }

}
