import { Component, OnDestroy } from '@angular/core';
import { SearchService } from './app.component.service';
import * as moment from 'moment';
import { IfDetails, IfDetailsHeader } from './app.component.if-details';
import { TabsContainer } from 'angular-tabs-component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent implements OnDestroy {
  private fareSearchResults = [];
  private tempOriginalSearchResults = [];
  private searchResult: IfDetails;
  private dataSubscriber: Subscription;

  title = 'Flight Search Engine';
  flightsearchResult: IfDetails [] = [];
  currentSearchdetails: IfDetailsHeader = {
    origin: undefined,
    destination: undefined,
    departureDate: undefined,
    returnDate: undefined,
    isOneWay: true};
  statusMessage: string;

  constructor(private searchService: SearchService) {

  }

  trackbyTupleID(index: number , item: any): string {
    return item.id;
  }


  onFlightSearchRequested(form: any): void {
    if (!form.filterRequested) {
      this.getFlightsDetails(form);
    } else {
      this.getFareFilteredData(form);
    }

    this.currentSearchdetails.origin = form.origin;
    this.currentSearchdetails.destination = form.destination;
    this.currentSearchdetails.isOneWay = form.isOneWay;
    const departureDate: moment.Moment = this.getConvertedDateFormat(form.departureDate);
    this.currentSearchdetails.departureDate = departureDate.format();

    if (!form.isOneWay) {
      const returnDate: moment.Moment = this.getConvertedDateFormat(form.returnDate);
      this.currentSearchdetails.returnDate = returnDate.format();
    }
  }


  private getFlightsDetails(form: any) {
    if (this.tempOriginalSearchResults && this.tempOriginalSearchResults.length > 0) {
      this.tempOriginalSearchResults = [];
      this.flightsearchResult = [];
    }
    this.dataSubscriber = this.searchService.getData().subscribe(data => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            const collectionDepartureDate: moment.Moment = moment(data[i].departDetails.departureDate);
            const searchDepartureDate: moment.Moment = this.getConvertedDateFormat(form.departureDate);

            const collectionReturnDate: moment.Moment = !form.isOneWay ? moment(data[i].returnDetails.returnDate) : undefined;
            const searchReturnDate: moment.Moment = !form.isOneWay ? this.getConvertedDateFormat(form.returnDate) : undefined;
            data[i].fare = form.isOneWay ? String((+data[i].fare) * (+form.personSelect)) :
            String((+data[i].fare) * (+form.personSelect) * 2 );
            this.searchResult = data[i];
            //this.flightsearchResult.push(this.searchResult);
            if (
              (data[i].departDetails.origin.toLowerCase( ) === form.origin.toLowerCase( )) &&
              (data[i].departDetails.destination.toLowerCase( ) === form.destination.toLowerCase( )) &&
              (searchDepartureDate.format() === collectionDepartureDate.format()) &&
              (form.isOneWay ? true : searchReturnDate.format() === collectionReturnDate.format()))  {
                data[i].fare = form.isOneWay ? String((+data[i].fare) * (+form.personSelect)) :
                                String((+data[i].fare) * (+form.personSelect) * 2 );
                this.searchResult = data[i];
                this.flightsearchResult.push(this.searchResult);
            }
          }
          this.tempOriginalSearchResults = this.flightsearchResult;
        },
        (error) => {
          this.statusMessage = 'Ooops! Data issues. Please try later.';
        },
        () => {
          this.flightsearchResult.length === 0 ? this.statusMessage = 'Sorry! No Flights for the choosen criteria.' :
          this.statusMessage = '';
        });
        console.log('Search Results: ', this.flightsearchResult);
  }

 
  private getFareFilteredData(form: any) {
    if (this.fareSearchResults.length !== 0) {
      this.fareSearchResults = [];
    }
    for (let i = 0; i < this.tempOriginalSearchResults.length; i++) {
      if (Number(this.tempOriginalSearchResults[i].fare) >= Number(form.fareFrom)
      && Number(this.tempOriginalSearchResults[i].fare) <= Number(form.fareUpTo)) {
          this.searchResult = this.tempOriginalSearchResults[i];
          this.fareSearchResults.push(this.searchResult);
      }
    }
    console.log('Slider Filtered Results: ', this.fareSearchResults);
    this.flightsearchResult = this.fareSearchResults;

    this.flightsearchResult.length === 0 ?
      this.statusMessage = 'Sorry! No matching flight do exist. Please try with different fare range.' :
      this.statusMessage = '';
  }


  private getConvertedDateFormat(inputDate: any): moment.Moment {
    return  moment(inputDate.replace( /(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
  }

  ngOnDestroy() {
    this.dataSubscriber.unsubscribe();
    this.fareSearchResults = null;
    this.tempOriginalSearchResults = null;
    for (let fdetail in this.flightsearchResult) {
      if (fdetail != null) {
        fdetail = null;
      }
    }
    this.flightsearchResult = null;
  }
}
