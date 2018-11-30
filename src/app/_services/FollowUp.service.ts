import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";


@Injectable()

export class FollowUpService {
    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/";

    getAllEnquiryFollowUp(today : string) {

      //  console.log("report service",today);
        // Make the GET HTTP request:
        return this._http.get<any[]>(this.baseUrl+"enquiryFollowUp/getAllEnquiryFollowUp?today="+today);
    }
    
    getAllInstallmentFollowUp(installmentTillDate : String ,today : string) {

        console.log("report service",today);
        // Make the GET HTTP request:                                                       
        return this._http.get<any[]>(this.baseUrl+"installmentFollowUp/getAllInstallmentFollowUp?installmentTillDate=" +installmentTillDate+ "&today="+today);
    }
}