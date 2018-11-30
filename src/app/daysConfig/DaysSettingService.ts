import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppSettings } from './AppSettings ';
// import { AppSettings } from ;
@Injectable()
export class DaysSettingService {
  constructor(private _http: HttpClient) {
  }
//https://www.codeproject.com/Articles/1196924/Configuration-Settings-for-Angular-Applications

public getSettings(): Observable<any> {
    return this._http.get('assets/daysetting.json');
}

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrors(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
  
} 