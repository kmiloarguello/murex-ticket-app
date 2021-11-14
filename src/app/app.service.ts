import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tickets } from './core/models/tickets.models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private readonly http: HttpClient) { }

  public getTickets(): Observable<Tickets> {
    return this.http.get<Tickets>('assets/tickets.json');
  }
}
