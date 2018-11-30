import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../_services/report.service';

@Component({
  selector: 'app-expected-income-detials',
  templateUrl: './expected-income-details.component.html',
  styleUrls: ['./expected-income-details.component.css']
})
export class ExpectedIncomeDetails implements OnInit {
  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;
  private autoGroupColumnDef;

  public rowDatas;
  public context;
  public frameworkComponents;

  public rowSelection;

  fromDate: string;
  toDate: string;
  cid: number;
  constructor(private _route: ActivatedRoute,
    private _reportService: ReportService) {

    this.columnDefs = [

      {
        headerName: "Course Name",
        field: "courseName",
        width: 100,
        filter:'agTextColumnFilter'
      },
      {
        headerName: "Installment Amount",
        field: "installmentAmount",
        width: 110,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",

      },
      {
        headerName: "Installment Date",
        field: "installmentDate",
        width: 120,
        filter:'agTextColumnFilter',
      },

    ];
    this.context = { componentParent: this };
    this.rowSelection = "single";
  

  }

  onGridReady(params) {
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    // this._reportService.getExpectedIncomeReport(this.fromDate, this.toDate, this.cid).subscribe((data: any[]) => {

    //   console.log("Arrive data expected income ", data);
    //   this.rowData = data;
    //   //params.api.sizeColumnsToFit();
    // });

  }

  getDataForRow(){
    this._reportService.getExpectedIncomeReport(this.fromDate, this.toDate, this.cid).subscribe((data: any[]) => {
      this.rowData = data;
    });
  }

  ngOnInit() {

    this._route.queryParams.subscribe(queryParams => {
     
      this.cid = queryParams.cid;
      this.fromDate = queryParams.fromDate;
      this.toDate = queryParams.toDate;
      this.getDataForRow();
      
    });
// second way of reading query param 
    // if (this._route.snapshot.queryParamMap.has('fromDate') && this._route.snapshot.queryParamMap.has('toDate')) {

    //   this.fromDate = this._route.snapshot.queryParamMap.get('fromDate');
    //   this.toDate = this._route.snapshot.queryParamMap.get('toDate');
    //   console.log("report panel", this.fromDate + " " + this.toDate);

    // }
  }

}
