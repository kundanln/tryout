import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {

  constructor() { }

  BaseUrl():string{
    return "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest";
  }
}
