import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";


@Injectable()

export class ReportService {
    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/report";

    getAllAdmissionreport(fromDate : string ,toDate :string) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this.baseUrl+"/getAdmissionReport?from="+fromDate+"&to="+toDate);
    }
    getCollectionReport(fromDate : string ,toDate :string ,  courseId:number) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this.baseUrl+"/getCollectionReport?from="+fromDate+"&to="+toDate+"&id="+ courseId);
    }

    getExpectedIncomeReport(fromDate : string ,toDate :string,  courseId:number) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this.baseUrl+"/getExpectedIncomeReport?from="+fromDate+"&to="+toDate+"&id="+ courseId);
    }

}