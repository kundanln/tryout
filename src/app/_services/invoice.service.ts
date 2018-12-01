import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";
import { InvoiceModel } from "../_models";
import { BaseserviceService } from "./baseservice.service";


@Injectable()
export class InvoiceService {
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

    baseUrl: string = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/invoice";


    create(record: InvoiceModel) {

        //console.log("Add Invoice record ",JSON.stringify(record));
        return this._http.post(this._baseService.BaseUrl()+'/add',record);

    }

    getRecoredById(id : Number)
    {
        return this._http.get<InvoiceModel>(this._baseService.BaseUrl()+"/getById/id/"+ id);
    }

}