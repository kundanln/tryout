import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";
import { InvoiceModel } from "../_models";


@Injectable()
export class InvoiceService {
    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/invoice";


    create(record: InvoiceModel) {

        //console.log("Add Invoice record ",JSON.stringify(record));
        return this._http.post(this.baseUrl+'/add',record);

    }

    getRecoredById(id : Number)
    {
        return this._http.get<InvoiceModel>(this.baseUrl+"/getById/id/"+ id);
    }

}