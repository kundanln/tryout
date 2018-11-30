import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    template: `<span>
                <a title="Delete" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-trash"></i>
                </a>
               </span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class CourseDeleteButtonComponent implements ICellRendererAngularComp {
    
    constructor(private _router : Router ){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        
       //console.log("ButtonCompo ",this.params.context.componentParent.this.gridApi.RowNode.data.address);
       console.log("ButtonCompo1 ",this.params.data.cid);
    //    let regID=+this.params.data.registrationId;
    //    this._router.navigate(['/installmentDetails',regID]);
       this.params.context.componentParent.DeletemethodFromParent(`${this.params.data.cid}`)
       //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return true;
    }
}
