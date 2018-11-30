import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    // <a [class.disabled]="payButton" title="Pay Installment" class="btn btn-social-icon" (click)="invokeParentMethod()">
    template: `<span>
    <a [class.disabled]="payButtonStatus" title="Pay Installment" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-rupee"></i> 
                </a>
               </span>`,
    styles: [
        `a.disabled {
            pointer-events: none;
            cursor:default;
        }`
    ]
})
export class PayInstallmentButton implements ICellRendererAngularComp {
    
    payButtonStatus: boolean;
    constructor(private _router : Router ){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
        this.payButtonStatus=this.params.data.flag;
        console.log("payButtonStatus =>",this.payButtonStatus);
    }

    public invokeParentMethod() {
        
        //installment id
       console.log("expected installment id ",this.params.data.id);
       this.params.context.componentParent.payMethodFromParent(`${this.params.data.id}`)
       //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
