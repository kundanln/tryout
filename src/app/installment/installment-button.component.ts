import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    template: `<span>
                <a title="View Details" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-folder-open"></i> 
                </a>
               </span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class InstallmentButton implements ICellRendererAngularComp {
    
    constructor(private _router : Router ){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
       
        //console.log("ButtonCompo1 ",this.params.data.registrationId);
        //let regID=+this.params.data.registrationId;
        //this._router.navigate(['/installmentDetails',regID]);
        //console.log("int button ",this.params.data);
        
       this.params.context.componentParent.methodFromParent(this.params.data)
       //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
