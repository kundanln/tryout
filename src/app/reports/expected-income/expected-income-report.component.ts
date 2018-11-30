import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-expected-income-report',
  templateUrl: './expected-income-report.component.html',
  styleUrls: ['./expected-income-report.component.css']
})
export class ExpectedIncomeReportComponent implements OnInit {
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
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _reportService: ReportService) {

    this.columnDefs = [

      {
        headerName: "Course Name",
        field: "courseName",
        width: 220,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
       
        
      },
      {
        headerName: "Installment Amount",
        field: "installmentAmount",
        width: 150,
        filter:'agTextColumnFilter',
        cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
        

      },
     

    ];
    this.context = { componentParent: this };
    this.rowSelection = "single";


  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    this._reportService.getExpectedIncomeReport(this.fromDate, this.toDate,0).subscribe((data: any[]) => {

      console.log("Arrive data expected income ", data);
      this.rowData = data;
      //params.api.sizeColumnsToFit();
      
    });

  }


  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString:number;
    selectedRows.forEach(function(selectedRow, index) {
     
      selectedRowsString =+ selectedRow.courseId;
    });
    console.log(selectedRowsString , "selectedRowsString  ");
    
    this._router.navigate(['/expectedcollectionReport/expected-income-details'],{ queryParams : { 'fromDate' : this.fromDate ,'toDate' : this.toDate,'cid': selectedRowsString} });
  }


  ngOnInit() {

    if (this._route.snapshot.queryParamMap.has('fromDate') && this._route.snapshot.queryParamMap.has('toDate')) {

      this.fromDate = this._route.snapshot.queryParamMap.get('fromDate');
      this.toDate = this._route.snapshot.queryParamMap.get('toDate');
      console.log("report panel", this.fromDate + " " + this.toDate);

    }
  }

}
