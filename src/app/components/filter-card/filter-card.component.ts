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

  private _checkedStatus: string[] = []; // Helper when we need to store 1 or more filters
  
  // Information for the status
  filterStatusOptionList: any = [
    { id: "filter-by-ok",       value: "OK",        title:"Ok",       icon: "check_circle_outline",   checked: false },
    { id: "filter-by-forward",  value: "FORWARD" ,  title:"Forward",  icon: "arrow_forward",          checked: false },
    { id: "filter-by-warning",  value: "WARNING",   title:"Warning",  icon: "error_outline",          checked: false },
    { id: "filter-by-decline",  value: "DECLINE",   title:"Decline",  icon: "highlight_off",          checked: false },
  ];

  // Information for the Categories
  filterCategoryOptionList: any = [
    { value: "all", title: "All categories" },
    { value: "blog", title: "Blog" },
    { value: "documentation", title: "Documentation" },
    { value: "library", title: "Library" }
  ];

  // Information for the internal attribute
  filterExtIntOptionList: any = [
    { value: "all", title: "Both" },
    { value: "false", title: "External" },
    { value: "true", title: "Internal" }
  ];

  constructor(private _store: Store) { }
  
  ngOnInit(): void {
  }


  /**
   * @description This function filter based on a specific onchange event. 
   *              - It is useful for the <select> elements
   *              - It triggers an action to update the global store with the given filter value
   * @param event onchange event
   * @param filterType {string} i.e category or internal 
   * @returns 
   */
  filterBySelect(event, filterType: string = "category") {

    if (event.target.value !== "all") {
      return this._store.dispatch(ticketsActions.aFilterListOfTickets({ filter: event.target.value, filtertype: filterType }));
    }

    this._store.dispatch(ticketsActions.aRequestTickets());

  }


  /**
   * @description This function is triggered when the user choose multiple status filter
   *              - It receives the event... then it adds to a global variable _checkedStatus the filter to obtain an array of filters
   *              - It removes the filter when the user select it again
   *              - It makes the dispatch to the store
   * @param event onclick event
   */
  filterByStatus(event) {
    if (event.target.checked) {

      this._checkedStatus = [...this._checkedStatus, event.target.value];
    
      // Helper to check the selected input
      for(let i=0; i<this.filterStatusOptionList.length; i++) {
        if (this.filterStatusOptionList[i].value == event.target.value) {
          this.filterStatusOptionList[i].checked = true;
        }
      }
      
    } else {
      // Remove filter of array
      this._checkedStatus = this._checkedStatus.filter((filter) => filter !== event.target.value);
    }
    
    this._store.dispatch(ticketsActions.aFilterListOfTicketsByAggregate({ filters: this._checkedStatus })); 
  }


  /**
   * @description This function resets the filters and uncheck all the checkbox 
   */
  resetFilters() {
    this._store.dispatch(ticketsActions.aRequestTickets());

    for(let i=0; i<this.filterStatusOptionList.length; i++) {
      this.filterStatusOptionList[i].checked = false;
    }
  }



}
