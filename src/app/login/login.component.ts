import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validator, ValidatorFn, AbstractControl } from "@angular/forms";
import { UserModel } from '../_models';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    username: string;
    password: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {

        this.username = this.model.username;
        this.password = this.model.password;
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.route.queryParamMap.subscribe( queryParams =>  {
        //     this.returnUrl=queryParams['returnUrl']|| '/';
        // });
    }

    login() {


        // this.loading = true;
        // this.authenticationService.login(this.username, this.password)
        // .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             //this.alertService.error(error);
        //             this.loading = false;
        // });

        this.userService.getByUserId(this.model.username).subscribe((user: UserModel) => {

            if (user) {
                if (user.emailAddress == this.model.username && user.password == this.model.password) {

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // localStorage.getItem('currentUser');   //to get the current user 
                  //  alert('Login Successfully');
                    this.router.navigate(['/home']);
                    console.log("this.returnUrl" + this.returnUrl);
                }else{
                    alert('Invalid User Password');
                }
            }
            else{
                    alert('Invalid User Name And Password');
                }
            },
            error => {
                throw error;
            });

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
