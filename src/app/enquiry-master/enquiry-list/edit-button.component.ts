import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<span>
                <a title="Edit" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-pencil"></i> 
                </a>
               </span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class EnquiryEditButtonComponent implements ICellRendererAngularComp {
    
    constructor(){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        
      //console.log("ButtonCompo ",this.params.context.componentParent.this.gridApi.RowNode.data.address);
     //  console.log("ButtonCompo1 ",this.params.data.enqId);
    //    let regID=+this.params.data.registrationId;
    //    this._router.navigate(['/installmentDetails',regID]);
       this.params.context.componentParent.methodFromParent(`${this.params.data.enqId}`)
       //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
