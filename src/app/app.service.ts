import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iTicketsList } from './core/models/tickets.models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private readonly http: HttpClient) { }

  public getTickets(): Observable<iTicketsList> {
    return this.http.get<iTicketsList>('assets/tickets.json');
  }
}
