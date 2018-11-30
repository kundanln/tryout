import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Enquiry, Course } from "../../_models";
//import { EnquiryService, CourseService, ButtonStatusService, AddmissionService } from "../../_services";
import { AddmissionService } from "../../_services/admission.service";

import { admissionModel } from "../../_models/admission.model";
import { InvoiceButton } from "./invoiceButton";

@Component({

   //moduleId: module.id.toString(),
    templateUrl: './admission-list.component.html',
    //styleUrls: ['./course-list.css']
    styles: [`
        #myGrid
        {
            flex-grow: 1;
            height: 500px !important;
            min-height: 500px !important;
        }
    `],

})

export class AdmissionListComponent implements OnInit {

    //ag-grid
    private gridApi;
    private gridColumnApi;
    public rowData: admissionModel[];
    public columnDefs;
    public rowDatas;
    public context;
    public frameworkComponents;
    public rowSelection;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private admissionService: AddmissionService,
    ) {
        this.columnDefs = [
            // {
            //     headerName: " ",
            //     cellRenderer: "DeleteButton",
            //     width: 45,
            // },
            {
                headerName: " ",
                cellRenderer: "InvoiceButton",
                width: 45,
                suppressFilter: true,
                cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
    
            },
            {
                headerName: "Reg No",
                width: 100,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
                valueGetter: function (params) {
                    return params.data.registrationModelList[0].id;
                }
            },
            {
                headerName: "Name",
                width: 150,
                filter:'agTextColumnFilter',
		        cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },
                valueGetter: function (params) {
                    return params.data.firstName + " " + params.data.lastName;
                }
            },
            {
                headerName: "Course Name",
                width: 150,
                filter:'agTextColumnFilter',
		        cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },
                valueGetter: function (params) {
                    return params.data.registrationModelList[0].course.courseName;
                }

            },
            {
                headerName: "Mobile Number",
                field: "mobileNumber",
                width: 150,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		        cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },
            },
            {
                headerName: "Total Fee",
                width: 120,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		        cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },
                valueGetter: function (params) {
                    return params.data.registrationModelList[0].feesAfterDiscount;
                }
            },
            {
                headerName: "Number Of Installment",
                width: 170,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		        cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },
                valueGetter: function (params) {
                    return params.data.registrationModelList[0].numOfInstallment;
                }
            },
        ];

        this.context = { componentParent: this };
        this.frameworkComponents = {
            InvoiceButton: InvoiceButton,
        };
        this.rowSelection = "single";
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //this.loadAllCourses();
        params.api.sizeColumnsToFit();

    }
    ngOnInit() {

        this.loadAllAdmissions();
    };

    getInstallmentList(cell) {

        const regId = +cell;
        //alert("Parent Component Method from " + regId + "!");
        this.router.navigate(['/installmentList', regId]);
    }
    private loadAllAdmissions() {
        this.admissionService.getAll().subscribe((data: admissionModel[]) => {
            // Data extraction from the HTTP response is already done
            // Display the result
            this.rowData = data;
            console.log('list of admissions from database in admission list compo ', data);

            //console.log(data[0].registrationModelList[0].course.courseName);

            // data.forEach(datModel=>{

            //     console.log("sid ",datModel.studId);
            //     datModel.registrationModelList.forEach( resgModel =>{
            //         console.log("reg id ",resgModel.id);
            //         console.log("reg id ",resgModel.course.courseName);
            //     })
            // })


    },
    error => {
        throw error;
    });
    }

}