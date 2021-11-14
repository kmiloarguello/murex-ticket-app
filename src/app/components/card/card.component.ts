import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/tickets.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public ticket: Ticket;

  constructor() { }

  ngOnInit(): void {
  }

}
