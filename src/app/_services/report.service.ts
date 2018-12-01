import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import { BaseserviceService } from "./baseservice.service";


@Injectable()

export class ReportService {
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

    //baseUrl: string = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/report";

    getAllAdmissionreport(fromDate : string ,toDate :string) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this._baseService.BaseUrl()+"/getAdmissionReport?from="+fromDate+"&to="+toDate);
    }
    getCollectionReport(fromDate : string ,toDate :string ,  courseId:number) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this._baseService.BaseUrl()+"/getCollectionReport?from="+fromDate+"&to="+toDate+"&id="+ courseId);
    }

    getExpectedIncomeReport(fromDate : string ,toDate :string,  courseId:number) {
        // Make the GET HTTP request:
        return this._http.get<any[]>(this._baseService.BaseUrl()+"/getExpectedIncomeReport?from="+fromDate+"&to="+toDate+"&id="+ courseId);
    }

}