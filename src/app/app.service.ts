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
    console.log("the filter was",filter);

    let updateTickets: Ticket[] = tickets;

    console.log(updateTickets)

    let _updateTickets = updateTickets.filter((ticket) => new RegExp(filter,"ig").test(ticket[filtertype]));

    return of(_updateTickets);
  }
}
