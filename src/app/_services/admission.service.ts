import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
//import "rxjs/add/operator/map";
//import { map } from 'rxjs/operators';
import { PreRequireInvoiceModel } from "../_models/pre-require-invoice.model";


@Injectable()

export class AddmissionService {
    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/addmission";


    create(record: any) {

       // console.log("record ",JSON.stringify(record));
        return this._http.post(this.baseUrl+'/add',record);

    }

    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this.baseUrl + "/getAll");
        // return this._http.get<User[]>('/api/users');
    }

    getRecoredById(id : Number)
    {
        //reg id
        return this._http.get<any>(this.baseUrl+"/getInsById/id/"+ id);
    }

}