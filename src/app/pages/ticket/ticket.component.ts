import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '@app/core/models/tickets.models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ticketsActions from '../../store/tickets/tickets.actions';
import * as ticketsSelectors from '../../store/tickets/tickets.selectors';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  public form : FormGroup;
  shouldPlotNotification: boolean = false;
  public tickets$: Observable<Ticket[]>;
  public ticket: Ticket;
  currentTicketID$: Observable<string>
  currentTicketID: string;
  isInternal: boolean = false;
  private _isEditingTicket: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private _store: Store, private _router: Router ) { 
    this.tickets$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    this.currentTicketID$ = this._store.select(ticketsSelectors.selectCurrentTicketID);

    this.currentTicketID$.subscribe((id) => {
      if (id.length > 0) {

        this.currentTicketID = id;
        this.tickets$.subscribe((tickets) => {
          this.ticket = tickets.filter((ticket) => ticket.id === id)[0];
        });
        this._isEditingTicket = true;
      } else {
         // when it is a new ticket
         this.currentTicketID = this.generateAnewRandomID();
      }
    });

   
  }

  ngOnInit(): void {

    const { 
      id,
      user,
      title,
      status,
      category,
      description,
      internal
     } = this.ticket || {};

    this.form = this.formBuilder.group({
      id: [this.currentTicketID], 
      title: [title, [Validators.required]],
      description: [description, [Validators.required]],
      category: [category, [Validators.required]],
      status: [status, [Validators.required]],
      user: [user, [Validators.required]],
      internal: [internal, [Validators.required]]
     });

     this.isInternal = this.ticket?.internal;

  }

  onSubmit() {
    if (this.form.invalid) return this.plotNotification();
    let data = this.form.value;
    
    if (data.internal === "true") {
      data.internal = true;
    } else {
      data.internal = false;
    }

    if (this._isEditingTicket) {
      console.log("Editing ticket");
      this._store.dispatch(ticketsActions.aEditTicket({ ticket: data, id: this.currentTicketID }));

    } else {
      console.log("Creating ticket");
      this._store.dispatch(ticketsActions.aCreateANewTicket({ ticket: data }));
    }

    this._router.navigate(['/']);
  }

  plotNotification (){
    this.shouldPlotNotification = true;

    setTimeout(() => {
      this.shouldPlotNotification = false;
    }, 3000);
  }

  generateAnewRandomID () {

    const randomPart1 = Math.random().toString(16).substr(2, 8);
    const randomPart2 = Math.random().toString(16).substr(2, 4);
    const randomPart3 = Math.random().toString(16).substr(2, 4);
    const randomPart4 = Math.random().toString(16).substr(2, 8);

    return randomPart1 + "-" + randomPart2 + "-" + randomPart3 + "-" + randomPart4;
  }

}
