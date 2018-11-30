import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DoFallowUpService } from "../../_services/do-fallowUp.service";
import { DatePipe } from "@angular/common";
import { DoFallowUpModel } from "../../_models/do-fallowUp";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../_models";

@Component({

  //  moduleId: module.id.toString(),
    templateUrl: 'do-installment-fallowUp.html',
    //styleUrls : [ 'enquiry.component.css' ]

})


export class DoInstallmentFallowUpComponent implements OnInit {

    model: DoFallowUpModel = this.loadEmptyModel();

    //form
    @ViewChild('modelForm')
    public modelFormref: NgForm;

    private selectedId: number;
    public dateWiseComentList: any[];
    logInDate: Date = new Date();

    datePickerConfig: Partial<BsDatepickerConfig>;
    currentUser : UserModel;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private doFallowUpservice: DoFallowUpService,
        public datepipe: DatePipe,
    ) {
        this.selectedId = +this.route.snapshot.queryParamMap.get('installmentId');
        console.log("installmentId Id :", this.selectedId);

        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD',
                minDate : new Date()
            }
        )
        this.model.installmentId = this.selectedId;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.followUpBy =this.currentUser.firstName+" "+this.currentUser.lastName;
        //this.model.followUpActualDate = this.datepipe.transform(this.logInDate, 'yyyy-MM-dd');
        this.model.followUpActualDate = this.logInDate;
    }

    ngOnInit() {
        this.loadDataWiseComent();
    }

    loadDataWiseComent() {
        this.doFallowUpservice.getAllInstallmentFollowUpComment(this.selectedId)
            .subscribe((data) => {
                console.log("getAllInstallmentFollowUpComment =>", data);
                this.dateWiseComentList = data;
            },
            error => {
                throw error;
            });
    }

    loadEmptyModel(): DoFallowUpModel {

        return {

            comment: null,
            nextFallowUp: null,//fallowUp Expected Date
            installmentId: null,
            followUpActualDate: null,
            followUpBy: null,
        }
    }
    AddInstallmentFalllowUp() {

        console.log("AddInstallmentFalllowUp ", this.model);
        this.doFallowUpservice.AddInstallmentComment(this.model).subscribe((data) => {
            alert('Comment Added Successfully');
            this.modelFormref.reset();
            //this.model=this.loadEmptyModel();
            this.loadDataWiseComent();

        },
        error=>{
            throw error;
        })
    }
}