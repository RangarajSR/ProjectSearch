import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { DatePickerComponent } from 'ng2-date-picker';
import * as momentNs from 'moment';
import { Moment } from 'moment';
const moment = momentNs;

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: []
})

export class SearchInputComponent implements OnInit, OnDestroy {

  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;

  private inputElem: any;
  private formData: any;

  @Input()
  isOneWay = false;
  myForm: FormGroup;
  validationMinDate: Moment;
  list: any[] = ['1', '2', '3'];
  edit: any;
  min = 0;
  max = 10000;
  flightSearchSlider = {
    name: 'Flight Search Slider',
    onUpdate: undefined,
    onFinish: undefined};

  constructor(private fb: FormBuilder) {}

  @Output()
  flightSearchInitiated: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    const group = {
      'origin': ['', Validators.required],
      'destination': ['', Validators.required],
      'departureDate': ['', Validators.required],
      'personSelect': ['', Validators.required]
    };
    if (!this.isOneWay) {
      group['returnDate'] = ['', [ Validators.required, control => this.validationMinDate &&
        moment(control.value).isBefore(this.validationMinDate) ? {minDate: 'minDate Invalid'} : undefined
      ]];
    }
    this.myForm = this.fb.group(group);
  }

  onSubmit(form: any): void {
    this.formData = form;
    console.log('you submitted value:', form);
    // callback to parent component
     this.flightSearchInitiated.emit({
       origin: form.origin,
       destination: form.destination,
       departureDate: form.departureDate,
       returnDate: form.returnDate,
       filterRequested: false,
       isOneWay: this.isOneWay,
       personSelect: form.personSelect});

       this.resetFareFilterSlider('0', '10000');
  }

  resetFareFilterSlider(from, to) {
    this.sliderElement.update({from: from, to: to});
  }

  update(fareSlider, event) {
    fareSlider.onUpdate = event;
    console.log('FareSlider updated: From: ' +
    fareSlider.onUpdate.from + ' To: ' + fareSlider.onUpdate.to );
  }

  finish(fareSlider, event) {
    fareSlider.onFinish = event;
    console.log('FareSlider finished: From: ' +
    fareSlider.onUpdate.from + ' To: ' + fareSlider.onUpdate.to );
    this.flightSearchInitiated.emit({
      origin: this.formData.origin,
      destination: this.formData.destination,
      departureDate: this.formData.departureDate,
      returnDate: this.formData.returnDate,
      fareFrom: fareSlider.onUpdate.from ,
      fareUpTo: fareSlider.onUpdate.to,
      filterRequested: true,
      isOneWay: this.isOneWay });
  }

  ngOnDestroy() {
    this.flightSearchInitiated.unsubscribe();
    this.list = null;
  }
}
