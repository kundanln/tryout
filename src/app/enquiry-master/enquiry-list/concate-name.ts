import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    template: `{{ fullName }}`,
  
})
export class ConcateName  implements ICellRendererAngularComp {
    
    constructor(private _router : Router ){

    }
    public params: any;
    fullName : string;
    agInit(params: any): void {
        this.params = params;
        this.fullName=this.params.data.firstName +" "+ this.params.data.lastName;
        
    }

    refresh(): boolean {
        return false;
    }
}
