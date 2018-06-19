import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabModule } from 'angular-tabs-component';
import { HeaderModule } from './modules/header/header.module';
import { SearchInputModule } from './modules/search-input/search-input.module';
import { FlightCardHeaderModule } from './modules/flight-card-header/flight-card-header.module';
import { FlightCardModule } from './modules/flight-card/flight-card.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HeaderModule,
        SearchInputModule,
        FlightCardHeaderModule,
        FlightCardModule,
        TabModule,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Flight Search Engine'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Flight Search Engine');
  }));

  it('should return count 0 from service as a negative test though actual result is 3', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;

    const  form: any = {
            from: 'goa',
            destination: 'delhi',
            departureDate: '30-06-2018',
            filterRequested: false,
            isOneWay: true,
            personSelect: 1};

    app.onFlightSearchRequested(form);

    expect(app.flightsearchResult.length).toEqual(0);
  }));
});
