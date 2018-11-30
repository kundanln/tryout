import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    // <a [class.disabled]="payButton" title="Pay Installment" class="btn btn-social-icon" (click)="invokeParentMethod()">
    template: `<span>
                <a [class.disabled]="!payButtonStatus" title="Print" class="btn btn-social-icon" (click)="invokeParentMethod()">
                    <i class="fa fa-fw fa-print"></i>
                </a>
               </span>`,
    styles: [
        `a.disabled {
            pointer-events: none;
            cursor:default;
        }`
    ]
})
export class GenrateInvoiceButton implements ICellRendererAngularComp {

    payButtonStatus: boolean;
    constructor(private _router: Router) {
    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
        this.payButtonStatus = this.params.data.flag;
        console.log("payButtonStatus =>", this.payButtonStatus);
    }

    public invokeParentMethod() {

        //invoice id require
        console.log("ex ", this.params.data.invoiceId);
        this.params.context.componentParent.payMethodFromParent(`${this.params.data.invoiceId}`)
        //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
