import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../_services/FollowUp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DaysSettingService } from '../daysConfig/DaysSettingService';
import { AppSettings } from '../daysConfig/AppSettings ';
import { InstallmentFallowUpButton } from './installment-fallowup-button';

@Component({
  selector: 'app-installment-followup',
  templateUrl: './installment-followup.component.html',
  styleUrls: ['./installment-followup.component.css']
})
export class InstallmentFollowupComponent implements OnInit {

  display = 'none';

  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;
  public rowDatas;
  public context;
  public frameworkComponents;
  public rowSelection;
  private today;
  currentDate: Date = new Date();
  private settings: AppSettings;
  private installmentFollowupDays: number;
  private installmentTillDate;
  
  constructor(private _route: ActivatedRoute,
    private _router : Router,
    private _followUpService: FollowUpService,
    public datepipe: DatePipe,
    private daySettingsService: DaysSettingService) {



    this.columnDefs = [

      {
        headerName: " ",
        cellRenderer: "InstallmentFallowUpButton",
        width: 45,
        suppressFilter: true,
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Full Name",
        field: "fullName",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Course Name",
        field: "courseName",
        //cellRenderer: "cubeRenderer",
        //colId: "cube",
        width: 150,
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
        headerName: "Email Id",
        field: "emailId",
        //cellRenderer: "paramsRenderer",
        //colId: "params",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Address",
        field: "address",
        //cellRenderer: "paramsRenderer",
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
        headerName: "Paid Amount",
        field: "paidAmount",
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
        headerName: "Remaining Amount",
        field: "remainingAmount",
        //cellRenderer: "paramsRenderer",
        //colId: "params",
        width: 170,
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

      InstallmentFallowUpButton: InstallmentFallowUpButton

    };

    this.rowSelection = "single";
  

  }
  onGridReady(params) {
   
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    

    this.daySettingsService.getSettings()
      //.map(res => res.json())
      .subscribe((appSeting: AppSettings) => {
        this.installmentFollowupDays = appSeting.installmentFollowupDays;
        this.today=this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
        this.currentDate.setDate(this.currentDate.getDate() + this.installmentFollowupDays);

        this.installmentTillDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
        this._followUpService.getAllInstallmentFollowUp(this.installmentTillDate, this.today).subscribe((data: any[]) => {
            console.log("Installment Fallow Up data", data);
            this.rowData = data;
           // params.api.sizeColumnsToFit();
          })
      },
      error=>{
          throw error;        
      });

  }
  methodFromParent(cell) {

    const installmentId=+cell;
   //this.model=cell;
    //alert("Parent Component Method from " + installmentId + "!");
    this._router.navigate(['/do-installment'],
    { 
      queryParams : {installmentId : installmentId }
    }
    );
  }
  ngOnInit() {
     
  }
  onRowSelected(event) {

    // window.alert("row " + event.node.data.athlete + " selected = " + event.node.selected);
    this.openModal(event); 

  }
 
  openModal(event) {

    //this.fullName=event.node.data.fullName

    this.display = 'block';
  }
  onCloseHandled(){
    this.display='none'; 
  }

  
}
