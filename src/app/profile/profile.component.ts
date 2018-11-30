import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validator } from "@angular/forms";
import { UserModel } from '../_models';
import { NgForm } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DatePipe } from '../../../node_modules/@angular/common';
import { UserService } from '../_services/user.service';
//import { PreviousRouteService } from '../_services/previous-route.service';
import * as $ from 'jquery';


@Component({
    selector: `app-profile`,
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {

    datePickerConfig: Partial<BsDatepickerConfig>;

    model: UserModel =
        {
            firstName: null,
            middleName: null,
            lastName: null,
            birthDate: null,
            mobileNumber: null,
            emailAddress: null,
            address: null,
            pincode: null,
            password: null,
            dateOfJoining: null,
        };


    previousUrl: string;

    constructor(
        private router: Router,
        private userService: UserService,
        public datepipe: DatePipe,
        // public previousRoute : PreviousRouteService
    ) {

        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD'
            }
        )

        // this.previousUrl=this.previousRoute.getPreviousUrl();
        // console.log("previous url",this.previousRoute.getPreviousUrl());

    }

    ngOnInit() {
        this.model = JSON.parse(localStorage.getItem('currentUser'));

    }

    onCancel() {
        this.router.navigate(['/home']);
    }

    onUpdate() {

        this.model.birthDate = this.datepipe.transform(this.model.birthDate, 'yyyy-MM-dd');
        this.model.dateOfJoining = this.datepipe.transform(this.model.dateOfJoining, 'yyyy-MM-dd');
        this.userService.update(this.model).subscribe(() => {
            alert('Update successfully');
            //  this.alertService.success('Registration successful', true);
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
            // to remove model css 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        });
    }



}
