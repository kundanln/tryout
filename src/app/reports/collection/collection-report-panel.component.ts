import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-collection-report-panel',
  templateUrl: './collection-report-panel.component.html',
  styleUrls: ['./collection-report-panel.component.css']
})
export class CollectionReportPanelComponent implements OnInit {

  
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
    private _router: Router,
              private _reportService : ReportService ) {

    this.columnDefs = [
      // {
      //   headerName: "Date",
      //   field: "paidOn",
      //  // width: 120
      // },
      {
        headerName: "Course Name",
        field: "course",
        width: 220,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
       
        //cellRenderer: "squareRenderer",
        //editable: true,
        //colId: "square",
       // width: 120
      },
      {
        headerName: "Cash Collection",
        field: "cashCollectuion",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
       
        //cellRenderer: "cubeRenderer",
        //colId: "cube",
       // width: 150
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

    this._reportService.getCollectionReport(this.fromDate,this.toDate , 0).subscribe((data: any[]) => {
      this.rowData = data;
      //params.api.sizeColumnsToFit();
    },
    error=>{
      throw error;
    });

  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString:number;
    selectedRows.forEach(function(selectedRow, index) {
     
      selectedRowsString =+ selectedRow.courseId;
      console.log("in collection cid = " , selectedRowsString);
      
    });
    this._router.navigate(['/collectionReport/collection-details'],{ queryParams : { 'fromDate' : this.fromDate ,'toDate' : this.toDate,'cid': selectedRowsString} });
  }


  ngOnInit() {

    if(this._route.snapshot.queryParamMap.has('fromDate') && this._route.snapshot.queryParamMap.has('toDate') ){

      this.fromDate = this._route.snapshot.queryParamMap.get('fromDate');
      this.toDate = this._route.snapshot.queryParamMap.get('toDate');
      console.log("report panel",this.fromDate+" "+this.toDate);
      
    }

  }


}
