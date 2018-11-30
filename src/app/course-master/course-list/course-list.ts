import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Course } from "../../_models";
import { CourseEditButtonComponent } from "./cs-edit-button.component";
import { CourseDeleteButtonComponent } from "./cs-delete-button.component";
import { CourseService } from "../../_services/course.service";

@Component({

    templateUrl: './course-list.html',
    styleUrls: ['./course-list.css']

})


export class CourseListComponent implements OnInit {

    private selectedId: number;
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        private courseService: CourseService,

    ) {
        this.columnDefs = [
            // {
            //     headerName: " ",
            //     cellRenderer: "DeleteButton",
            //     width: 45,
            // },
            {
                headerName: " ",
                cellRenderer: "EditButton",
                width: 40,
                filter: 'agTextColumnFilter',
                suppressFilter: true,


            // rowClass :'my-green-class'
            //     cellClass: function(params) { 
            //         if (params.node.rowIndex % 2 === 0) {
            //         return {color: 'red', backgroundColor: 'green'}; 
            //     }else{
            //         return {color: 'red', backgroundColor: 'red'}; 
            //     }
            // }   

            // cellStyle: {color: 'red', 'background-color': 'green'}

               cellStyle: function(params) {
                if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                else { return {backgroundColor: '#E6E4E4'};}
               },

            },
            {
                headerName: "Course Name",
                field: "courseName",
                width: 150,
                filter:'agTextColumnFilter',
		 cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Duration",
                field: "durationInDays",
                width: 100,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		 cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Fees",
                field: "fees",
                width: 100,filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		 cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Max Discount",
                field: "maxDiscount",
                width: 130,
                filter:'agNumberColumnFilter',
                cellClass:"number-cell",
		 cellStyle: function(params) {
                    if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
                    else { return {backgroundColor: '#E6E4E4'};}
                   },
            },
            {
                headerName: "Description",
                field: "courseDiscription",
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

            DeleteButton: CourseDeleteButtonComponent,
            EditButton: CourseEditButtonComponent

        };

        this.rowSelection = "single";
        this.notify.emit(false); 


        //this.rowClassRules = {

            // "sick-days-warning": function(params) {
            //   var fees = params.data.fees;
            //   return fees;
            // },
          // "sick-days-breach": true
          //};

        // this.rowClassRules = function(params){

        //     return { background: 'red' };
            // if(params.node.rowIndex % 2 === 0){

            //     return { background: 'red' }
            // }
            // else {
            //     return { background: 'red' }
            // }
       // };


    }
     
       // set background color on every row
        // this is probably bad, should be using CSS classes
       
          //  this.gridOptions.rowStyle = {background: 'black'};
        // set background color on odd rows
        // again, this looks bad, should be using CSS classes
        // gridOptions.getRowStyle = function(params) {
        //             if (params.node.rowIndex % 2 === 0) {
        //                 return { background: 'red' }
        //             }
        //         }
     

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.loadAllCourses();
        params.api.sizeColumnsToFit();

    }

    EditmethodFromParent(cell) {

        //console.log("DueListCompo ",this.gridApi.RowNode.data.address);

        const cid = +cell;
        //alert("Parent Component Method from " + cid + "!");
        this.router.navigate(['/cs/cs-add'], {
            queryParams: { 'updateId': cid }

        });
    }
    DeletemethodFromParent(cell) {

        const cid = +cell;
        this.deleteCourse(cid);
    }
    deleteCourse(id: number) {

        if (confirm('Are you sure you want to delete this record from the database?')) {
            this.courseService.delete(id).subscribe((data) => {

                if (data) {
                    console.log("delete ", data);
                    this.loadAllCourses();
                    // this.gridApi.redrawRows();
                    // this.router.navigate(['./cs/cs-list']);  

                } else {
                }
            });
        }
    }
    ngOnInit() {
        this.loadAllCourses();
    };

    private loadAllCourses() {
        this.courseService.getAll().subscribe((data: Course[]) => {
            // Data extraction from the HTTP response is already done
            // Display the result
            this.rowData = data;
            console.log('list of courses from database ', data);
            },
            error => {
                throw error;
            });
    }

}