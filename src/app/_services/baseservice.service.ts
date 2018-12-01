import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {

  constructor() { }

  BaseUrl():string{
    return "https://cms-eclipse.herokuapp.com/rest";
  }
}
