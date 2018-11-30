import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import "rxjs/add/operator/map"; //to convert responce to IEmployee array 
import { DoFallowUpModel } from "../_models/do-fallowUp";


@Injectable()
export class DoFallowUpService {

    // Inject HttpClient into your component .
    constructor(private _http: HttpClient) { }

    burl: String = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/";



    getAllInstallmentFollowUpComment(id: number) {
        return this._http.get<any[]>(this.burl + "Api/getAllInstallmentFollowUpComment/" + id);
    }
    AddInstallmentComment(model: DoFallowUpModel) {
        return this._http.post(this.burl + 'Api/addInstallmentFollowUp/', model);
    }

    getAllEnquryFollowUpComment(id: number) {
        //change URl
        return this._http.get<any[]>(this.burl + "enquiryFollowUp/getAllEnquiryFollowUpComment/" + id);
    }
    AddEnquiryComment(model: DoFallowUpModel) {
        //change URl
        return this._http.post(this.burl + 'enquiryFollowUp/addEnquiryFollowUp/', model);
    }
    
    // getAll() {
    //            // Make the GET HTTP request:
    //     return this._http.get(this.burl+"/courses/getAll");
    // }





}
