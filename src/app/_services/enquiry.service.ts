import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Enquiry } from "../_models";
import { BaseserviceService } from "./baseservice.service";

// import "rxjs/add/operator/map";


@Injectable()

export class EnquiryService {

    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

    //baseUrl: string = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/enquiry";

    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this._baseService.BaseUrl() + "/enquiry/getAll");
        // return this._http.get<User[]>('/api/users');

    }
    getById(id: number) {
        return this._http.get(this._baseService.BaseUrl() + "/enquiry/getById/id/" + id);
    }
    create(enquiry: Enquiry) {

        return this._http.post(this._baseService.BaseUrl() + '/enquiry/add', enquiry);
    }
    update(enquiry: Enquiry) {
        //console.log("at enquiry service ",enquiry);
        return this._http.put(this._baseService.BaseUrl() + '/enquiry/update/id/' + enquiry.enqId, enquiry);
    }
}
