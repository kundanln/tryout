import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Enquiry, Course, UserModel } from "../../_models";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { CourseService } from "../../_services/course.service";

@Component({

    templateUrl: 'course-add.html',
    styleUrls: ['./course-add.css']

})
export class CourseAddComponent {

    model: Course = {
        cid: null,
        courseName: null,
        courseDiscription: null,
        durationInDays: null,
        fees: null,
        maxDiscount: null,
        addedBy: null,
        addedOn: null,
    };
    
    currentUser : UserModel;
    logInDate: Date = new Date();
    currentCourse: Course;
    button = "Add";
    updateId : number ;
    
    @ViewChild('modelForm')
    public modelFormref: NgForm;
    
    @Output() notify: EventEmitter<boolean> =new EventEmitter<boolean>();
    
    constructor(private router: Router,
        private route: ActivatedRoute,
        public datepipe: DatePipe,
        private courseService: CourseService,
       ) {
        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.addedBy = this.currentUser.firstName+" "+this.currentUser.lastName;
        this.model.addedOn = this.datepipe.transform(this.logInDate, 'yyyy-MM-dd ');

   //this.model.addedOn = this.DateTimeFormatPipe.transform(this.logInDate);
        //console.log("logInDate Course ",this.logInDate);
        
      //  this.model.addedOn =this.logInDate;
      
        
        
        if(this.route.snapshot.queryParamMap.has('updateId'))
        {   
            this.updateId =+this.route.snapshot.queryParamMap.get('updateId');
            this.getRecordByID(this.updateId);
        }   
        this.notify.emit(true);
    }

    ngOnInit() {
    }

    // reset()
    // {
    //     //this.model={};
    //     this.model.reset();
    // }
    addUpdateCourse() {

        if (this.button == 'Add') {

            console.log(this.model);
            this.courseService.create(this.model).subscribe(() => {
                //this.model={};
                this.modelFormref.reset();
                alert('Record Added Successfully');
                this.router.navigate(['./cs/cs-list',{ 'lastInsert' : this.model.cid }]);


            },
            error=>{
                throw error;        
            });
        } else if (this.button == 'Update') {

            this.courseService.update(this.model).subscribe(() => {

                alert('Record updated Successfully');
                this.button = 'Add';
                this.router.navigate(['./cs/cs-list',{ 'lastUpdate' : this.model.cid }]);
                console.log('form data to update in database', this.model);
            },
            error=>{
                throw error;        
            });    

        }
    }

    getRecordByID(id: number) {
        this.courseService.getById(id).subscribe((data: Course) => {
            this.currentCourse = data;
            this.button = 'Update';
            this.model = this.currentCourse;
            console.log("getting data for editing course ", this.currentCourse);

        },
        error=>{
            throw error;
        });
    }
    Cancel(){

        if(this.button == 'Update'){
            this.router.navigate(['./cs/cs-list']);
        }else{
            console.log("cancel click");
            
        }
    }
    

}