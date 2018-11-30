import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    //if this class.button-status apply visibilty to element is hide
    template: `<span>
                <a [class.disabled]="payButtonStatus" title="Edit" class="btn btn-social-icon" (click)="invokeEditParentMethod()">
                 <i class="fa fa-fw fa-pencil"></i> 
                </a>
               </span>
                `,
    styles: [
        `a.disabled {
            pointer-events: none;
            cursor:default;
        }`
    ]
})
export class EditUpdateButton implements ICellRendererAngularComp {

    EditbuttonStatus : boolean;
    SavebuttonStatus : boolean;
    payButtonStatus: boolean;


    constructor(private _router: Router) {

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
        this.payButtonStatus=this.params.data.flag;
        
        this.EditbuttonStatus=false;
       //this.SavebuttonStatus=!this.EditbuttonStatus;

    }

    public invokeSaveParentMethod() {

        //console.log("save buttton call");
        //console.log("ButtonCompo ",this.params.context.componentParent.this.gridApi.RowNode.data.address);
        //console.log("save buttton ",this.params.data.id);
        this.EditbuttonStatus=false;
      //  this.SavebuttonStatus=!this.EditbuttonStatus;
        this.params.context.componentParent.SaveMethodFromParent(`${this.params.data.id}`);
         //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
     }
    public invokeEditParentMethod() {
       // console.log("Edit buttton call");
        this.EditbuttonStatus=true;
     //   this.SavebuttonStatus=!this.EditbuttonStatus;
       // var rowindex = this.params.node.rowIndex;
        this.params.context.componentParent.EditMethodCallFromChild(`${this.params.node.rowIndex}`)
        //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
