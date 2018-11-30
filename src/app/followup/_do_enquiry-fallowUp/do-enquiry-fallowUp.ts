import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DoFallowUpService } from "../../_services/do-fallowUp.service";
import { DoFallowUpModel } from "../../_models/do-fallowUp";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../_models";




@Component({

    //moduleId: module.id.toString(),
    templateUrl: 'do-enquiry-fallowUp.html',
    //styleUrls : [ 'enquiry.component.css' ]

})


export class DoEnquiryFallowUpComponent implements OnInit {

    model: DoFallowUpModel =this.loadEmptyModel();

    //form
    @ViewChild('modelForm')
    public modelFormref: NgForm;

    private selectedId: number;
    public dateWiseComentList: any[];
    logInDate: Date = new Date();
    user: UserModel;

    public datePickerConfig: Partial<BsDatepickerConfig>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private doFallowUpservice: DoFallowUpService,
    ) {
        this.selectedId = +this.route.snapshot.queryParamMap.get('enqid');
        console.log("enq Id :", this.selectedId);

        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD',
                minDate : new Date()
            })

        this.model.enqid = this.selectedId;
        this.user=JSON.parse(localStorage.getItem('currentUser'));
        this.model.followUpBy = this.user.firstName+" "+this.user.lastName;
        //this.model.followUpActualDate = this.datepipe.transform(this.logInDate, 'yyyy-MM-dd');
        this.model.followUpActualDate = this.logInDate;

    }

    ngOnInit() {
        this.loadDataWiseComent();

    }
    loadEmptyModel(): DoFallowUpModel {

        return {

            comment: null,
            nextFallowUp: null,
            freezEnquery: false,
            enqid: null,
            followUpActualDate: null,
            followUpBy: null,
        }
    }
    loadDataWiseComent() {
        this.doFallowUpservice.getAllEnquryFollowUpComment(this.selectedId)
            .subscribe((data) => {
                console.log("getAllEnquryFollowUpComment =>", data);
                this.dateWiseComentList = data;
            },
            error=>{
                throw error;
            });
    }

    AddEnquiryFalllowUp() {
        console.log("AddEnquiryFalllowUp ", this.model);
        var mm=Object.assign({},this.model);
        this.doFallowUpservice.AddEnquiryComment(mm).subscribe((data) => {

            if(data){
                alert('Comment Added Successfully');
               
               // this.model=this.loadEmptyModel();
                this.loadDataWiseComent();
                this.modelFormref.reset();
            }
        },
        error => {
            throw error;
        })
    }
}