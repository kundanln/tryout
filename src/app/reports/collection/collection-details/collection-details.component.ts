import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../_services/report.service';

@Component({
  selector: 'app-collection-detials',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetails implements OnInit {
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
        field: "course",
        width: 90
      },
      {
        headerName: " Amount",
        field: "cashCollectuion",
        width: 90,

      },
      {
        headerName: "Date",
        field: "paidOn",
        width: 90
      },

    ];
    this.context = { componentParent: this };
    this.rowSelection = "single";
  

  }

  onGridReady(params) {
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

  }

  getDataForRow(){
    this._reportService.getCollectionReport(this.fromDate, this.toDate, this.cid).subscribe((data: any[]) => {
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

  }

}
