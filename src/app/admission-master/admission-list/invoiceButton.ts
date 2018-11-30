import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from "@angular/router";

@Component({
    selector: 'child-cell',
    // <a [class.disabled]="payButton" title="Pay Installment" class="btn btn-social-icon" (click)="invokeParentMethod()">
    template: `<span>
                <a  title="Genrate Invoice" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-info-circle"></i>
                </a>
               </span>`,
    styles: [
        `a.disabled {
            pointer-events: none;
            cursor:default;
        }`
    ]
})
export class InvoiceButton implements ICellRendererAngularComp {

    constructor(private _router: Router) {

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {

        console.log("reg ID ",this.params.data.registrationModelList[0].id);
        this.params.context.componentParent.getInstallmentList(`${this.params.data.registrationModelList[0].id}`)
        //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
