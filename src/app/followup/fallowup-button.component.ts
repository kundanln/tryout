import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    template: `<span>
                <a title="Fallow Up" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-phone"></i>
                </a>
               </span>`,
    styles: [
        `.btn {
            line-height: 0.9
        }`
    ]
})
export class FallowUpButton implements ICellRendererAngularComp {
    
    constructor(private _router : Router ){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        
       //console.log("ButtonCompo ",this.params.context.componentParent.this.gridApi.RowNode.data.address);
       console.log("ButtonCompo1 ",this.params.data.enquiryModel.enqId);
    //    let regID=+this.params.data.registrationId;
    //    this._router.navigate(['/installmentDetails',regID]);
       this.params.context.componentParent.methodFromParent(`${this.params.data.enquiryModel.enqId}`)
       //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
