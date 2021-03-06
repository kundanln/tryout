import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
//import "rxjs/add/operator/map";
//import { map } from 'rxjs/operators';
import { PreRequireInvoiceModel } from "../_models/pre-require-invoice.model";
import { BaseserviceService } from "./baseservice.service";


@Injectable()

export class AddmissionService {
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

   // baseUrl: string = "https://cms-eclipse.herokuapp.com/CMS_Hibernate_Backend_V0.11/rest/addmission";


    create(record: any) {

       // console.log("record ",JSON.stringify(record));
        return this._http.post(this._baseService.BaseUrl()+'/add',record);

    }

    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this._baseService.BaseUrl() + "/getAll");
        // return this._http.get<User[]>('/api/users');
    }

    getRecoredById(id : Number)
    {
        //reg id
        return this._http.get<any>(this._baseService.BaseUrl()+"/getInsById/id/"+ id);
    }

}