import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/throw';
import { IfDetails } from './app.component.if-details';

@Injectable()
export class SearchService {
  private baseUrl = `./assets/details.json`;

  queryUrl = '?search=';
  searchTerm$ = new Subject<string>();

  constructor(private http: Http) { }


  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
        .get(this.baseUrl)
        .map(res => res.json());
  }
 

  getData(): Observable <IfDetails[] > {
    return this.http.get(this.baseUrl)
    .map(
      (res: Response ) => <IfDetails[]>res.json())
    .catch(this.errorHandler);
  }
  
  errorHandler(error) {
    console.error('Error in getAPI');

    return Observable.throw(error);
  }
}
