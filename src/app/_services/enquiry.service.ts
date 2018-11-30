import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Enquiry } from "../_models";

// import "rxjs/add/operator/map";


@Injectable()

export class EnquiryService {

    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/enquiry";

    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this.baseUrl + "/getAll");
        // return this._http.get<User[]>('/api/users');

    }
    getById(id: number) {
        return this._http.get(this.baseUrl + "/getById/id/" + id);
    }
    create(enquiry: Enquiry) {

        return this._http.post(this.baseUrl + '/add', enquiry);
    }
    update(enquiry: Enquiry) {
        //console.log("at enquiry service ",enquiry);
        return this._http.put(this.baseUrl + '/update/id/' + enquiry.enqId, enquiry);
    }
}
