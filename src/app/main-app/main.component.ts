import { Component } from '@angular/core';
import { Router ,NavigationStart,NavigationEnd, Event, ActivatedRoute } from '../../../node_modules/@angular/router';
import { UserModel } from '../_models';
import { BsDatepickerConfig } from '../../../node_modules/ngx-bootstrap/datepicker';
import { UserService } from '../_services/user.service';
import { DatePipe } from '../../../node_modules/@angular/common';
import { DateModel } from '../_models/dateModel';
import * as $ from 'jquery';

@Component({
    selector: 'main-app',
    templateUrl: 'main.component.html',
    styleUrls :['main.component.css']
})

export class MainComponent { 

    currentUser: UserModel;
    temp: boolean = false;
    frmDate: string;
    toDate: string;
    cheOpecity: boolean = false;
    memeber: string;

    datePickerConfig: Partial<BsDatepickerConfig>;

    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.memeber=this.datePipe.transform(this.currentUser.dateOfJoining, "dd-MM-yyyy");

        this.datePickerConfig = Object.assign({},

            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD'
            }
        )

    }
    dateModel: DateModel = {

        fromDate: null,
        toDate: null,
    }

    reports: any[] = [
        { id: 1, name: 'Admission' },
        { id: 2, name: 'Total Collection' },
        { id: 3, name: 'Expected Collection' },
    ];



    onSubmit(){

        //console.log("date jh : ", this.dateModel.fromDate.getFullYear()+"-"+this.dateModel.fromDate.getMonth()+"-"+this.dateModel.fromDate.getDate());
   
        this.frmDate = this.datePipe.transform(this.dateModel.fromDate, "yyyy-MM-dd");
        this.toDate = this.datePipe.transform(this.dateModel.toDate, "yyyy-MM-dd");
         console.log("from date  : ",this.frmDate);
         console.log("to date  : ",this.toDate);
        this.cheOpecity = true;

        this.router.navigate(['/admissionReport'], { queryParams: { 'fromDate': this.frmDate, 'toDate': this.toDate } });

        // to remove model css 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    onSubmitCollection() {

        this.frmDate = this.datePipe.transform(this.dateModel.fromDate, "yyyy-MM-dd");
        this.toDate = this.datePipe.transform(this.dateModel.toDate, "yyyy-MM-dd");
         console.log("from date  : ",this.frmDate);
         console.log("to date  : ",this.toDate);
        // this.cheOpecity= true;

        this.router.navigate(['/collectionReport'], { queryParams: { 'fromDate': this.frmDate, 'toDate': this.toDate } });
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    onSubmitExpectedInocome() {

        this.frmDate = this.datePipe.transform(this.dateModel.fromDate, "yyyy-MM-dd");
        this.toDate = this.datePipe.transform(this.dateModel.toDate, "yyyy-MM-dd");
        // console.log("from date  : ",this.frmDate);
        // console.log("to date  : ",this.toDate);
        // this.cheOpecity= true;

        this.router.navigate(['/expectedcollectionReport'], { queryParams: { 'fromDate': this.frmDate, 'toDate': this.toDate } });
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    signOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    }
    ngOnInit() {

        if (localStorage.getItem('currentUser')) {
            this.temp = true;
        }
    }

}
