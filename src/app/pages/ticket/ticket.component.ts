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
  shouldPlotNotification: boolean = false; // Helper to show a notification when the user has not completed the form
  public tickets$: Observable<Ticket[]>; // Observer from the store
  public ticket: Ticket; // Current Ticket
  currentTicketID$: Observable<string> // Observer current Ticket ID
  currentTicketID: string; // Current ID -> To modify the DOM
  isInternal: boolean = false; // Helper to update the DOM (radio buttons)
  private _isEditingTicket: boolean = false; // Helper to decide if it is editing or creating a new ticket
  
  constructor(private formBuilder: FormBuilder, private _store: Store, private _router: Router ) { 
    // Selecting tickets
    this.tickets$ = this._store.select(ticketsSelectors.selectOriginalTickets);
    this.currentTicketID$ = this._store.select(ticketsSelectors.selectCurrentTicketID);

    // Subscription to call tickets
    this.currentTicketID$.subscribe((id) => {

      // If ID exists == it is a editing ticket
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

    // Updating the form
    this.form = this.formBuilder.group({
      id: [this.currentTicketID], 
      title: [title, [Validators.required]],
      description: [description, [Validators.required]],
      category: [category, [Validators.required]],
      status: [status, [Validators.required]],
      user: [user, [Validators.required]],
      internal: [internal, [Validators.required]]
     });

     this.isInternal = this.ticket?.internal; // send the info to the DOM (update purposes)

  }

  onSubmit() {
    if (this.form.invalid) return this.plotNotification();
    let data = this.form.value;
    
    // interval must be a boolean
    if (data.internal === "true") {
      data.internal = true;
    } else {
      data.internal = false;
    }

    // Send the info as editing
    if (this._isEditingTicket) {
      console.log("Editing ticket");
      this._store.dispatch(ticketsActions.aEditTicket({ ticket: data, id: this.currentTicketID }));

    } else {
      // Send the info as new ticket
      console.log("Creating ticket");
      this._store.dispatch(ticketsActions.aCreateANewTicket({ ticket: data }));
    }

    this._router.navigate(['/']);
  }

  /**
   * @description This function triggers a tooltip when the user has not completed the form but he clicked on confirm
   */
  plotNotification (){
    this.shouldPlotNotification = true;

    setTimeout(() => {
      this.shouldPlotNotification = false;
    }, 3000);
  }


  /**
   * @description This function creates a new ticket ID
   * @returns {string} ticketID
   */
  generateAnewRandomID () {

    const randomPart1 = Math.random().toString(16).substr(2, 8);
    const randomPart2 = Math.random().toString(16).substr(2, 4);
    const randomPart3 = Math.random().toString(16).substr(2, 4);
    const randomPart4 = Math.random().toString(16).substr(2, 8);

    return randomPart1 + "-" + randomPart2 + "-" + randomPart3 + "-" + randomPart4;
  }

}
