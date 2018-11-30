import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validator } from "@angular/forms";
import { UserModel } from '../_models';
import { NgForm } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DatePipe } from '../../../node_modules/@angular/common';
import { UserService } from '../_services/user.service';


@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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

    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        public datepipe: DatePipe, ) {

        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD'
            }
        )
    }

    ngOnInit() {
        //to check current user 
        //console.log("currentUser :::",localStorage.getItem('currentUser'));
    }




    register() {
        
        this.model.birthDate = this.datepipe.transform(this.model.birthDate, 'yyyy-MM-dd');
        this.model.dateOfJoining = this.datepipe.transform(this.model.dateOfJoining, 'yyyy-MM-dd');

        this.userService.create(this.model).subscribe(() => {
            alert('Registration completed successfully');
            //  this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
        });
        // console.log("sign up data ", this.signUpForm.value);
    }


}
