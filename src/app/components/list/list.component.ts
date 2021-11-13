import { Component, Input, OnInit } from '@angular/core';
import { iTicketsList } from 'src/app/core/models/tickets.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() tickets?: iTicketsList[];

  constructor() { }

  ngOnInit(): void {
  }

}
