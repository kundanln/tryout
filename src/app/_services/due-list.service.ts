import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { InstallmentDetail } from "../_models";



@Injectable()

export class DueListService {
    constructor(private _http: HttpClient) { }

    baseUrl: string = "http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest/Api";

    getAll(installmentTillDate : string) {
        console.log("inst till  date  :> ",installmentTillDate);
        // Make the GET HTTP request:
        return this._http.get<any[]>(this.baseUrl+"/getAllDueList?installmentTillDate="+installmentTillDate);
        // return this._http.get<User[]>('/api/users');
    }

    // create(record: any) {

    //    // console.log("record ",JSON.stringify(record));
        
    //     return this._http.post(this.baseUrl+'/add',record);

    // }

    // getRecoredById(id : Number)
    // {
    //     return this._http.get(this.baseUrl+"/getAllInstallmentDetails/id/"+ id);
    // }

    getAllInstallmentDetails(regId : Number) {
        // console.log("in getAllInstallmentDetails method");
        // Make the GET HTTP request:
        return this._http.get<InstallmentDetail[]>(this.baseUrl+"/getAllInstallmentDetails/"+ regId);
        // return this._http.get<User[]>('/api/users');
    }

    UpdateInstallmentDetails(rowData : any[]){

        console.log("DueListService => ",rowData);
        return this._http.post<any[]>(this.baseUrl+"/addUpdateExpectedInstallment", rowData);
        
    }
post
}