import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ticketsActions from '../../store/tickets/tickets.actions';
import { Ticket } from 'src/app/core/models/tickets.models';

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent implements OnInit {

  private _checkedStatus: string[] = [];
  filterStatusOptionList: any = [];

  filterCategoryOptionList: any = [
    { value: "all", title: "All categories" },
    { value: "blog", title: "Blog" },
    { value: "documentation", title: "Documentation" },
    { value: "library", title: "Library" }
  ];

  
  filterExtIntOptionList: any = [
    { value: "all", title: "Both" },
    { value: "false", title: "External" },
    { value: "true", title: "Internal" }
  ];

  constructor(private _store: Store) {
    this.filterStatusOptionList = [
      { id: "filter-by-ok",       value: "OK",        title:"Ok",       icon: "check_circle_outline",   checked: false },
      { id: "filter-by-forward",  value: "FORWARD" ,  title:"Forward",  icon: "arrow_forward",          checked: false },
      { id: "filter-by-warning",  value: "WARNING",   title:"Warning",  icon: "error_outline",          checked: false },
      { id: "filter-by-decline",  value: "DECLINE",   title:"Decline",  icon: "highlight_off",          checked: false },
    ];
  }
  
  ngOnInit(): void {
  }

  filterByCategory(event) {
    this._store.dispatch(ticketsActions.filterListOfTickets({ filter: event.target.value, filtertype: "category" }));
  }

  filterByExtIntStatus(event) {
    this._store.dispatch(ticketsActions.filterListOfTickets({ filter: event.target.value, filtertype: "internal" }));
  }

  filterByStatus(event) {
    if (event.target.checked) {
      this._checkedStatus.push(event.target.value);

      for(let i=0; i<this.filterStatusOptionList.length; i++) {
        if (this.filterStatusOptionList[i].value == event.target.value) {
          this.filterStatusOptionList[i].checked = true;
        }
      }

    } else {
      this._checkedStatus = this._checkedStatus.filter((filter) => filter !== event.target.value);
    }

    this._store.dispatch(ticketsActions.filterListOfTicketsByAggregate({ filters: this._checkedStatus })); 
  }

  resetFilters() {
    this._store.dispatch(ticketsActions.requestTickets());
    console.log("reset")
    for(let i=0; i<this.filterStatusOptionList.length; i++) {
      this.filterStatusOptionList[i].checked = false;
    }
  }



}
