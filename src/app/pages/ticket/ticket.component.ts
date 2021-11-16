import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  //public tickets$: Subscription;
  public tickets$: Observable<Ticket[]>;
  public tickets: Ticket[];
  public ticket: Ticket;

  
  constructor(private formBuilder: FormBuilder, private _store: Store ) { 
    this.tickets$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    // 
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
      id: [""], 
      title: [title, [Validators.required]],
      description: [description, [Validators.required]],
      category: [category, [Validators.required]],
      status: [status, [Validators.required]],
      fullname: [user, [Validators.required]],
      internal: [internal, [Validators.required]]
     });

  }

  onSubmit() {
    if (this.form.invalid) return this.plotNotification();
    let data = this.form.value;
    
    if (data.internal === "true") {
      data.internal = true;
    } else {
      data.internal = false;
    }
  
    console.log("Sending data...", data);
    this._store.dispatch(ticketsActions.aCreateANewTicket( data ));
  }

  plotNotification (){
    this.shouldPlotNotification = true;

    setTimeout(() => {
      this.shouldPlotNotification = false;
    }, 3000);
  }

}
