import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import "rxjs/add/operator/map";
import { BaseserviceService } from "./baseservice.service";


@Injectable()

export class FollowUpService {
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

    //baseUrl: string = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/";

    getAllEnquiryFollowUp(today : string) {

      //  console.log("report service",today);
        // Make the GET HTTP request:
        return this._http.get<any[]>(this._baseService.BaseUrl()+"enquiryFollowUp/getAllEnquiryFollowUp?today="+today);
    }
    
    getAllInstallmentFollowUp(installmentTillDate : String ,today : string) {

        console.log("report service",today);
        // Make the GET HTTP request:                                                       
        return this._http.get<any[]>(this._baseService.BaseUrl()+"installmentFollowUp/getAllInstallmentFollowUp?installmentTillDate=" +installmentTillDate+ "&today="+today);
    }
}