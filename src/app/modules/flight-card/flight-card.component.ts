import { Component, Input } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {

  @Input()
  flightDetails: any = {};

  @Input()
  isOneWay = true;

  constructor() { }
}
