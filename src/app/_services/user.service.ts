import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from "../_models";



@Injectable()
export class UserService {
    
     // Inject HttpClient into your component .
    constructor(private _http: HttpClient) { }
   
    burl:String="http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest";

    getAll() {
               // Make the GET HTTP request:
        return this._http.get(this.burl+"/user/getAll");
                  
    }

    getById(id: number) {
        return this._http.get(this.burl+"/user/getById/id/"+ id);
    }

    getByUserId(userId: String) {
        return this._http.get<UserModel>(this.burl+"/user/getByProperty/"+ userId);
    }

    create(user: UserModel) {
        return this._http.post(this.burl+'/user/add',user);
    }

    update(model: UserModel) {
        return this._http.put(this.burl+'/user/update/id/'+ model.id, model);
    }

    delete(id: number) {
        return this._http.delete(this.burl+'/user/delete/id/' + id);
    }
    
}