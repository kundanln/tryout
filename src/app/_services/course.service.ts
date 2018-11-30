import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Course } from "../_models";
import{BaseserviceService}from'./baseservice.service';


@Injectable()

export class CourseService {
    
     // Inject HttpClient into your component .
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }
   
    burl:String="http://localhost:8080/CMS_Hibernate_Backend_V0.1/rest";

    getAll() {
               // Make the GET HTTP request:
        return this._http.get(this._baseService.BaseUrl()+"/courses/getAll");
                  
    }

    getById(id: number) {
        return this._http.get(this.burl+"/courses/getById/id/"+ id);
    }

    create(course: Course) {
        return this._http.post(this.burl+'/courses/add',course);
    }

    update(course: Course) {
        return this._http.put(this.burl+'/courses/update/id/'+ course.cid, course);
    }

    delete(id: number) {
        return this._http.delete(this.burl+'/courses/delete/id/' + id);
    }
    
}
