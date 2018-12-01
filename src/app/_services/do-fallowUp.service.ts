import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import "rxjs/add/operator/map"; //to convert responce to IEmployee array 
import { DoFallowUpModel } from "../_models/do-fallowUp";
import { BaseserviceService } from "./baseservice.service";


@Injectable()
export class DoFallowUpService {

    // Inject HttpClient into your component .
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

    burl: String = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/";



    getAllInstallmentFollowUpComment(id: number) {
        return this._http.get<any[]>(this._baseService.BaseUrl() + "Api/getAllInstallmentFollowUpComment/" + id);
    }
    AddInstallmentComment(model: DoFallowUpModel) {
        return this._http.post(this._baseService.BaseUrl() + 'Api/addInstallmentFollowUp/', model);
    }

    getAllEnquryFollowUpComment(id: number) {
        //change URl
        return this._http.get<any[]>(this._baseService.BaseUrl() + "enquiryFollowUp/getAllEnquiryFollowUpComment/" + id);
    }
    AddEnquiryComment(model: DoFallowUpModel) {
        //change URl
        return this._http.post(this._baseService.BaseUrl() + 'enquiryFollowUp/addEnquiryFollowUp/', model);
    }
    
    // getAll() {
    //            // Make the GET HTTP request:
    //     return this._http.get(this.burl+"/courses/getAll");
    // }





}
