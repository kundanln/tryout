import { Component, OnInit } from '@angular/core';

import { UserModel } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgForm } from '@angular/forms';
import { DateModel } from '../_models/dateModel';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { UserService } from '../_services/user.service';
@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    
    currentUser: UserModel;
    users: UserModel[] = [];
    frmDate :string;
    toDate : string;
    cheOpecity: boolean = false;

    dateModel :DateModel={

        fromDate : null,
        toDate : null,
    }

    //
    datePickerConfig : Partial<BsDatepickerConfig>;


    constructor(private userService: UserService,
                private  router : Router,
                private route : ActivatedRoute,
                private datePipe: DatePipe) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        this.datePickerConfig = Object.assign({ },
                
            { 
                containerClass : 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat : 'YYYY/MM/DD'
            }
        )

    }
    
  

    ngOnInit() {
        
    }
    onSubmit(){

        //console.log("date jh : ", this.dateModel.fromDate.getFullYear()+"-"+this.dateModel.fromDate.getMonth()+"-"+this.dateModel.fromDate.getDate());
        
        this.frmDate = this.datePipe.transform(this.dateModel.fromDate,"yyyy-MM-dd");
        this.toDate = this.datePipe.transform(this.dateModel.toDate,"yyyy-MM-dd");
        // console.log("from date  : ",this.frmDate);
        // console.log("to date  : ",this.toDate);
        this.cheOpecity= true;
       
        this.router.navigate(['/admissionReport'],{ queryParams : { 'fromDate' : this.frmDate ,'toDate' : this.toDate } });
        
        // to remove model css 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    onSubmitCollection(){

        this.frmDate = this.datePipe.transform(this.dateModel.fromDate,"yyyy-MM-dd");
        this.toDate = this.datePipe.transform(this.dateModel.toDate,"yyyy-MM-dd");
        // console.log("from date  : ",this.frmDate);
        // console.log("to date  : ",this.toDate);
       // this.cheOpecity= true;
       
        this.router.navigate(['/collectionReport'],{ queryParams : { 'fromDate' : this.frmDate ,'toDate' : this.toDate } });
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }


    modelHeader(){

    }
    showEnquiry()
    {   
        this.router.navigate(['enquiry'],{ relativeTo : this.route })
    }
}