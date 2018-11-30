import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Enquiry, Course, UserModel } from "../../_models";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { EnquiryService } from "../../_services/enquiry.service";
import { CourseService } from "../../_services/course.service";



@Component({

    templateUrl: 'enquiry-add.html',
    //styles : [`.c-btn { border : 1px solid #ccc;}`]
    styleUrls: ['./enquiry-add.css']

})


export class EnquiryAddComponent {

    model: Enquiry = {

        //enqId ? : number;
        firstName: null,
        middleName: null,
        lastName: null,
        enquiryDate: null,
        courses: null,
        address: null,
        highestQual: null,
        birthDate: null,
        refferedBy: null,
        collegeName: null,
        studentProfession: null,
        organizationName: null,
        mobileNumber: null,
        emailAddress: null,
        followUpDate: null,
        comment: null,
        freezEnquery: null,
        addedBy: null,
        addedOn: null,
    };

    @ViewChild('modelForm')
    public modelFormref : NgForm;
    
    //enquires: Enquiry[];
    currentUser : UserModel;
    currentEnquiry: Enquiry;
    button = "Add";

    enqDate : Date= new Date();
    logInDate: Date = new Date();



    //Multiselect DrodownList
    dropdownList: Course[] = [];
    //courses = [];

    dropdownSettings = {};

    datalist: Course[] = [];
    updateId : number ;
    datePickerConfigWithMin : Partial<BsDatepickerConfig>;
    datePickerConfigWithoutMin : Partial<BsDatepickerConfig>;
    
    
    constructor(
        private router: Router,
        public datepipe: DatePipe,
        private enquiryService: EnquiryService,
        private courseService: CourseService,
        private route: ActivatedRoute,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //console.log('currentUser',localStorage.getItem('currentUser'));
        this.model.addedBy = this.currentUser.firstName+" "+this.currentUser.lastName;   
        this.model.addedOn = this.datepipe.transform(this.logInDate, 'yyyy-MM-dd');
      
        //console.log("logInDate Enquiry ",this.logInDate);
        //this.model.addedOn =this.logInDate;
        if(this.route.snapshot.queryParamMap.has('updateId'))
        {   
            this.updateId =+this.route.snapshot.queryParamMap.get('updateId');
            this.getRecordByID(this.updateId);
        }   
        
        this.model.enquiryDate = this.datepipe.transform(this.enqDate, 'yyyy-MM-dd');

        this.datePickerConfigWithMin = Object.assign({ },
        
            { 
                containerClass : 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat : 'YYYY/MM/DD',
                minDate : new Date()
            }
        )
        
        this.datePickerConfigWithoutMin = Object.assign({ },
        
            { 
                containerClass : 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat : 'YYYY/MM/DD',
                //minDate : new Date()
            }
        )

    }

    private loadCourses() {
        this.courseService.getAll().subscribe((data: Course[]) => {

            this.datalist = data;
            this.dropdownList = this.datalist;
            console.log("dropdown list data", this.datalist);

        },
        error=>{
            throw error;        
        })
    }

    ngOnInit() {

        this.loadCourses();
        //this.loadAllEnquiry();
        this.dropdownSettings =
            {
                singleSelection: false,
                text: "Select Course",
                enableSearchFilter: true,

                labelKey: "courseName",
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                primaryKey: "cid",
               // classes : "has-error"
            };

    };

    //CURD
    addUpdateEnquiry() {

        this.model.enquiryDate = this.datepipe.transform(this.model.enquiryDate, 'yyyy-MM-dd');
        this.model.birthDate = this.datepipe.transform(this.model.birthDate, 'yyyy-MM-dd');
        this.model.followUpDate = this.datepipe.transform(this.model.followUpDate, 'yyyy-MM-dd');

        if (this.button == 'Add') {

            this.enquiryService.create(this.model).subscribe(() => {

                this.modelFormref.reset();
                this.dropdownList=[];
                alert('Record Added Successfully');
                this.router.navigate(['./enquiry/enq-list',{ 'lastInsert' : this.model.firstName }]);
                //this.loadAllEnquiry();
            },
            error=>{
                throw error;        
            });

            //console.log('form data to add in databse', this.model);

        }
        else if (this.button == 'Update') {

            this.enquiryService.update(this.model).subscribe(() => {

                alert('Record updated Successfully');
                this.button = 'Add';
                // console.log('form data to update in database', this.model);
                this.router.navigate(['./enquiry/enq-list',{ 'lastUpdate' : this.model.enqId }]);
            },
            error=>{
                throw error;        
            });

        }
    }
    
    getRecordByID(id: number) {
        this.enquiryService.getById(id).subscribe((data: Enquiry) => {
            this.currentEnquiry = data;
            this.button = 'Update';
            this.model = this.currentEnquiry;
            console.log("getting data for editing course ", this.currentEnquiry);

        },
        error=>{
            throw error;        
        });
    }
    Cancel(){

        if(this.button == 'Update'){
            this.router.navigate(['./enquiry/enq-list']);
        }else{
            console.log("cancel click");
            
        }
    }


}