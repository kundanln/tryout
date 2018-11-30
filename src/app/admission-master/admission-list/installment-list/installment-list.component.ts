import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { GenrateInvoiceButton } from './genrate-invoice-button';
import { InstallmentDetail } from 'src/app/_models/installmentDetail';
//import { InstallmentDetail } from 'src/app/_models';

@Component({
  selector: 'app-installment-list',
  templateUrl: './installment-list.component.html',
  styles: [`
        #myGrid
        {
            flex-grow: 1;
            height: 500px !important;
            min-height: 500px !important;
        }
        a.disabled {
            pointer-events: none;
            cursor:default;
        }
  `]
})
export class InstallmentListComponent implements OnInit {

  installmentDetailsData: InstallmentDetail[];

  //ag-grid
  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;
  public rowDatas;
  public context;
  public frameworkComponents;
  public rowSelection;
  private getRowNodeId;
  public defaultColDef;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    ) {
    
    this.columnDefs = [

      {
        headerName: "Number",
        field: "installmentNum",
        width: 70,
        filter:'agNumberColumnFilter',
        cellClass:"number-cell"
      },
      {
        headerName: "Date",
        field: "installmentDate",
        //cellRenderer: "DateCellRenderer",
        colId: "installmentDate",
        width: 130,
        filter:'agTextColumnFilter'
        
      },
      {
        headerName: "Amount",
        field: "installmentAmount",
        //cellRenderer: "CurrencyCellRenderer",
       //editable: true,
        colId: "installmentAmount",
        width: 80,
        filter:'agNumberColumnFilter',
        cellClass:"number-cell",
      },
      {
        headerName: "Invoice",
        cellRenderer: "GenrateInvoiceButton",
        width: 45,
      },
      
    ];

    this.defaultColDef = {

    };

    this.context = { componentParent: this };

    this.frameworkComponents = {
      GenrateInvoiceButton: GenrateInvoiceButton
    };

    this.rowSelection = "single";

    this.installmentDetailsData = this._route.snapshot.data['installmentDetailsData'];
    console.log("installmentDetails List compo ", this.installmentDetailsData);

  }//constructer close

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.rowData = this.installmentDetailsData;
    params.api.sizeColumnsToFit();

  };

  payMethodFromParent(cell){
    const invoiceID = +cell;
    // alert("Parent Component Method from " + id + "!");
    this._router.navigate(['/invoice', invoiceID]);
  }

  ngOnInit() {

  }

}

