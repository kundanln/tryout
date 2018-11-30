import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpService } from '../_services/FollowUp.service';
import { DatePipe } from '@angular/common';
import { DaysSettingService } from '../daysConfig/DaysSettingService';
import { AppSettings } from '../daysConfig/AppSettings ';
import { FallowUpButton } from './fallowup-button.component';
import { EnquiryComentsButton } from './comment-button.component';
import { EnquiryFallowUpModel } from './enquiry-fallowUp-model';
import { MultipleCourseRenderer } from './multiple-course';

@Component({
  selector: 'app-enquiry-followup',
  templateUrl: './enquiry-followup.component.html',
  styleUrls: ['./enquiry-followup.component.css']
})
export class EnquiryFollowupComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;
  public rowDatas;
  public context;
  public frameworkComponents;
  public rowSelection;

  currentDate: Date = new Date();
  private settings: AppSettings;
  private enqFollowupDays: number;

  private model: EnquiryFallowUpModel;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _followUpService: FollowUpService,
    public datepipe: DatePipe,
    private appSettingsService: DaysSettingService) {

    this.columnDefs = [
      {
        headerName: " ",
        cellRenderer: "EnquiryFallowUpButton",
        width: 40,
        suppressFilter: true,
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      // {
      //   headerName: "Comments",
      //  // field: "",
      //   cellRenderer: "EnquiryComentsButton",
      //   //colId: "params",
      //   width: 130,
      // },
      {
        headerName: "Full Name",
       // field: "fullName",
        valueGetter: function (params) {
          return params.data.enquiryModel.firstName+
          " "+params.data.enquiryModel.middleName+
          " "+params.data.enquiryModel.lastName;
        },
        width: 120,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },

      {
        headerName: "Course Name",
        cellRenderer :"multipleCourseRenderer",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Mobile Number",
        valueGetter: function (params) {
          return params.data.enquiryModel.mobileNumber;
        },
        width: 150,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Enquiry Date",
        valueGetter: function (params) {
          return params.data.enquiryModel.enquiryDate;
        },
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Follow Up Date",
        field: "followUpExpectedDate",
        width: 150,
        filter:'agTextColumnFilter',
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
    ];

    this.context = { componentParent: this };

    this.frameworkComponents = {

      EnquiryFallowUpButton: FallowUpButton,
      multipleCourseRenderer: MultipleCourseRenderer

    };

    this.rowSelection = "single";
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.currentDate.setDate(this.currentDate.getDate() + 1);
    let today = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');

    this._followUpService.getAllEnquiryFollowUp(today).subscribe((data: any[]) => {
      console.log("Enquiry Fallow Up data", data);
      this.rowData = data;
      params.api.sizeColumnsToFit();
    },
      error => {
        throw error;
      });

  }
  methodFromParent(cell) {

    // console.log("DueListCompo ",this.gridApi.RowNode.data.address);
    const enqId = +cell;
    //this.model=cell;
    //alert("Parent Component Method from " + enqId + "!");
    this._router.navigate(['/do-enquiry'],
      {
        queryParams: { enqid: enqId }
      }
    );
  }
  ngOnInit() {

  }
}


