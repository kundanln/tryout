import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import "rxjs/add/operator/map";
import { AppSettings } from '../../daysConfig/AppSettings ';
import { DueListService } from '../../_services/due-list.service';
import { DaysSettingService } from '../../daysConfig/DaysSettingService';
import { InstallmentButton } from '../installment-button.component';

@Component({
  selector: 'app-due-list',
  templateUrl: './due-list.component.html',
  styleUrls: ['./due-list.component.css']
})
export class DueListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;


  public rowDatas;
  public context;
  public frameworkComponents;
  private installmentTillDate;
  public rowSelection;
  private settings: AppSettings;
  private installmentFollowupDays: number;
  currentDate: Date = new Date();

  constructor(private _dueList: DueListService,
    private _router: Router, public datepipe: DatePipe,
    private daySettingsService: DaysSettingService) {

    this.columnDefs = [
      {
        //headerName: "Installment Details",
        headerName: " ",
        field: "value",
        cellRenderer: "installmentButton",
        colId: "params",
        width: 45,
        suppressFilter: true,
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "RegID",
        field: "registrationId",
        width: 100,
       
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
         filter:'agTextColumnFilter'
      },
      {
        headerName: "Full Name",
        field: "fullName",
        //cellRenderer: "cubeRenderer",
        //colId: "cube",
        width: 130,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Course",
        field: "courseName",
        //cellRenderer: "squareRenderer",
        //editable: true,
        //colId: "square",
        width: 130,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      
      {
        headerName: "Mobile Number",
        field: "mobileNumber",
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
      {
        headerName: "Email",
        field: "emailAddress",
        //cellRenderer: "currencyRenderer",
        //colId: "currency",
        width: 100,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Address",
        field: "address",
        //cellRenderer: "childMessageRenderer",
        //colId: "params",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Payable Amount",
        field: "payableAmount",
        width: 150,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Paid Amount",
        field: "paidAmount",
        width: 150,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Remaining Amount",
        field: "remainingAmount",
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
    this.frameworkComponents = {
      installmentButton: InstallmentButton
    };
    this.rowSelection = "single";

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this._dueList.getAll(this.installmentTillDate).subscribe((data: any[]) => {
    //   console.log("Arrive data", data);
    //   this.rowData = data;
    //   //params.api.sizeColumnsToFit();
    // });
    //second service call depend on the first service call output
    //convetion way of sequensing the calls
    this.daySettingsService.getSettings()
      //.map(res => res.json())
      .subscribe((appSeting: AppSettings) => {
        this.installmentFollowupDays = appSeting.installmentFollowupDays;
        this.currentDate.setDate(this.currentDate.getDate() + this.installmentFollowupDays);

        this.installmentTillDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
        this._dueList.getAll(this.installmentTillDate)
        .subscribe( (data : any[] )=>{
          console.log("Arrive data in DueList", data);
          this.rowData = data;
        })
      },
      error=>{
        throw error;       
      });

  }

  methodFromParent(cell) {

    var RowNodeData =cell;
    console.log("amount   ",RowNodeData.payableAmount);
    //const registrationId = +cell;
    //alert("Parent Component Method from " + RowNodeData.registrationId + "!");
    this._router.navigate(['/installmentDetails',RowNodeData.registrationId],{ queryParams : { 'name' : RowNodeData.fullName ,'course' : RowNodeData.courseName ,'total' : RowNodeData.payableAmount } });
  }

  // onSelectionChanged() {
  //   var selectedRows = this.gridApi.getSelectedRows();
  //   var selectedRowsString = "";
  //   selectedRows.forEach(function (selectedRow, index) {
  //     if (index !== 0) {
  //       selectedRowsString += ", ";
  //     }
  //     selectedRowsString += selectedRow.registrationId;
  //   });
  //   document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  // }

  //onRowClicked(event: any) { console.log('row', event); }
  // onCellClicked(event: any) { 
  //     console.log('cell', event); 
  //     console.log('cell data ', event.data); 
  // }
  //onSelectionChanged(event: any) { console.log("selection", event); }

  ngOnInit() {
   // this.getDaysFromJson();
  }

  // getDaysFromJson() {
  //   this.daySettingsService.getSettings().subscribe((data: AppSettings) => {
  //     this.settings = data;
  //     this.installmentFollowupDays = this.settings.installmentFollowupDays;
  //     // console.log(this.installmentFollowupDays , 'in due installment this.installmentFollowupDays in getDaysFromJson');

  //     this.currentDate.setDate(this.currentDate.getDate() + this.installmentFollowupDays);

  //     this.installmentTillDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  //     console.log(this.installmentTillDate, 'in due installment installmentTillDate inside method getDaysFromJson');

  //   });
  // }
}
