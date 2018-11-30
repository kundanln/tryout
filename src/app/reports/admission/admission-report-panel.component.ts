import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-admission-report-panel',
  templateUrl: './admission-report-panel.component.html',
  styleUrls: ['./admission-report-panel.component.css']
})
export class AdmissionReportPanelComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;


  public rowDatas;
  public context;
  public frameworkComponents;

  public rowSelection;

  fromDate : string ;
  toDate : string ;

  constructor(private _route : ActivatedRoute,
              private _reportService : ReportService ) {

    this.columnDefs = [
      {
        headerName: "Number Of Admission",
        field: "numOfAdmission",
        width: 120,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Course Name",
        field: "courseName",
        //cellRenderer: "squareRenderer",
        //editable: true,
        //colId: "square",
        width: 120,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Actual Fee",
        field: "actualFee",
        //cellRenderer: "cubeRenderer",
        //colId: "cube",
        width: 150,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Fees After Discount",
        field: "feesAfterDiscount",
        //cellRenderer: "paramsRenderer",
        //colId: "params",
        width: 150,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      
    ];

    this.context = { componentParent: this };

    // this.frameworkComponents = {

    //   installmentButton: InstallmentButton

    // };

    this.rowSelection = "single";

   }
   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    this._reportService.getAllAdmissionreport(this.fromDate,this.toDate).subscribe((data: any[]) => {

      console.log("Arrive data", data);
      this.rowData = data;
      //params.api.sizeColumnsToFit();
    },
    error=>{
      throw error;
    });

  }
  ngOnInit() {

    if(this._route.snapshot.queryParamMap.has('fromDate') && this._route.snapshot.queryParamMap.has('toDate') ){

      this.fromDate = this._route.snapshot.queryParamMap.get('fromDate');
      this.toDate = this._route.snapshot.queryParamMap.get('toDate');
      console.log("report panel",this.fromDate+" "+this.toDate);
      
    }

  }

}
