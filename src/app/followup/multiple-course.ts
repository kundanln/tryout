import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";
import { Course } from "../_models";

@Component({
    selector: 'child-cell',
    template: `
    <ng-container *ngFor="let name of courses">
         {{ name +',' }}    
    </ng-container>
    `,
})
export class MultipleCourseRenderer  implements ICellRendererAngularComp {
    
    constructor(private _router : Router ){

    }
    public params: any;
    courses : string[]=[];
    cname: string;
    private course : Course[];

    agInit(params: any): void {
        this.params = params;
      
        // this.course=this.params.data.courses;
        // console.log("1st ",this.course);

        var ss =this.params.data.enquiryModel.courses;
        
        for(var i=0;i<ss.length;i++){
            this.cname=ss[i].courseName
            //console.log("1st ",this.cname);
            this.courses.push(this.cname);
        }
    }

    refresh(): boolean {
        return false;
    }
}
