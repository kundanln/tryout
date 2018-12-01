import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from "../_models";
import { BaseserviceService } from "./baseservice.service";



@Injectable()
export class UserService {
    
     // Inject HttpClient into your component .
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }
   
   // burl:String="https://cms-eclipse.herokuapp.com/rest";

    getAll() {
               // Make the GET HTTP request:
        return this._http.get(this._baseService.BaseUrl()+"/user/getAll");
                  
    }

    getById(id: number) {
        return this._http.get(this._baseService.BaseUrl()+"/user/getById/id/"+ id);
    }

    getByUserId(userId: String) {
        return this._http.get<UserModel>(this._baseService.BaseUrl()+"/user/getByProperty/"+ userId);
    }

    create(user: UserModel) {
        return this._http.post(this._baseService.BaseUrl()+'/user/add',user);
    }

    update(model: UserModel) {
        return this._http.put(this._baseService.BaseUrl()+'/user/update/id/'+ model.id, model);
    }

    delete(id: number) {
        return this._http.delete(this._baseService.BaseUrl()+'/user/delete/id/' + id);
    }
    
}