import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Enquiry } from "../../_models";
import { EnquiryEditButtonComponent } from "./edit-button.component";
import { ConcateName } from "./concate-name";
import { CourseNameRenderer } from "./course-name";
import { EnquiryService } from "../../_services/enquiry.service";



@Component({

    templateUrl: './enquiry-list.html',
    styleUrls: ['./enquiry-list.css']

})


export class EnquiryListComponent implements OnInit {

    private selectedId: number;

    //ag-grid
    private gridApi;
    private gridColumnApi;
    public rowData: any[];
    public columnDefs;


    public rowDatas;
    public context;
    public frameworkComponents;
    public rowSelection;



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private enquiryService: EnquiryService,

    ) {

        this.columnDefs = [
            
            {
                headerName: "",
                cellRenderer: "EditButton",
                colId: "params",
                width: 45,
                suppressFilter: true,
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            // {
            //     headerName: "Id",
            //     field: "enqId",
            //     width: 100,

            // },
            {
                headerName: "Name",
                field: "firstName",
                cellRenderer : "ConcateName",
                width: 150,
                filter:'agTextColumnFilter',
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Courses",
                field: "courses",
                cellRenderer : "CourseNameRenderer",
                width: 130,
                filter:'agSetColumnFilter',
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Follow Up Date",
                field: "followUpDate",
                width: 150,
                filter:'agTextColumnFilter',
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Comment",
                field: "comment",
                width: 150,
                filter:'agTextColumnFilter',
		        cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Freeze Enquiry",
                field: "freezEnquery",
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

            EditButton: EnquiryEditButtonComponent,
            ConcateName : ConcateName,
            CourseNameRenderer : CourseNameRenderer,

        };

        this.rowSelection = "single";

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.loadAllEnquiry();
        params.api.sizeColumnsToFit();
    }

    methodFromParent(cell) {

        //console.log("DueListCompo ",this.gridApi.RowNode.data.address);

        const enqId = +cell;
       // alert("Parent Component Method from " + enqId + "!");
        this.router.navigate(['/enquiry/enq-add'], {
            queryParams: { 'updateId': enqId }

        });
    }


    ngOnInit() {

        this.selectedId = +this.route.snapshot.paramMap.get('lastUpdate');
        //this.loadAllEnquiry();

    };

    private loadAllEnquiry() {
        this.enquiryService.getAll().subscribe((data: Enquiry[]) => {
            // Data extraction from the HTTP response is already done
            // Display the result
            this.rowData = data;
            console.log('list of Enquires from database ', data);
        },
        error=>{
            throw error;
        });
    }

}