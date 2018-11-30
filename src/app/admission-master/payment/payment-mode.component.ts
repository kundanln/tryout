import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { admissionModel } from '../../_models/admission.model';
//import { AddmissionService, InvoiceService } from '../_services';
import { AddmissionService } from '../../_services/admission.service';

import { InvoiceModel, InstallmentDetail } from '../../_models';
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { RegistrationModel } from '../../_models/registration.model';
import { InvoiceService } from '../../_services/invoice.service';


@Component({
    selector: 'app-payment',
    templateUrl: './payment-mode.component.html',
    styleUrls: ['./payment-mode.component.css']
})
export class PayModeComponent implements OnInit {

    public showLoadingIndicator : boolean=false;
    display = "none";

    dataForInvoice: InvoiceModel;
    admissionModel: admissionModel;
    registrationModel: RegistrationModel = new RegistrationModel();
    registrationModelList: RegistrationModel[] = [];
    installmentModelList: InstallmentDetail[] = [];
    installmentModel: InstallmentDetail = new InstallmentDetail();
    numberOfInst: number;


    datePickerConfig: Partial<BsDatepickerConfig>;
    private installmentID: number;
    private token: boolean = false;

    model: any = {

        paymentType: null,
        paymentmode: null,
        checkNumber: null,
        checkDate: null,

    }

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _invoiceservice: InvoiceService,
        private addmissionService: AddmissionService, ) {

        // this.dataForInvoice = this._route.snapshot.data['invoicePreRequireData'];
        // console.log("InvoiceQueryModel from Db =>",this.dataForInvoice);

        this.admissionModel = JSON.parse(localStorage.getItem('admissionModel'));
        console.log("payment mode admission model =>", this.admissionModel);
        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                //showWeekNumbers : true,
                dateInputFormat: 'YYYY/MM/DD',
                minDate: new Date(),
            }
        )
    }

    ngOnInit() {


        if (this.admissionModel) {

            this.registrationModelList = this.admissionModel.registrationModelList;

            this.registrationModelList.forEach(element => {
                //var instModel = element.installmentDetail;
                this.registrationModel = element;
                var courses = element.course;
                this.registrationModel.courseName = courses.courseName;
                this.numberOfInst = this.registrationModel.numOfInstallment;
                this.installmentModelList = element.installmentDetail;
                this.installmentModelList.forEach(element1 => {

                    if (element1.installmentNum == 1) {

                        this.installmentModel = element1;
                    }


                });
                // console.log("length ",this.installmentModelList.length);
                console.log("length ", this.numberOfInst);

                if (this.numberOfInst > 1) {

                    this.model.paymentType = "installment";
                } else {
                    this.model.paymentType = "fullPayment";
                }

            });

        }else{

            this.model.paymentType="installment";
            if (this._route.snapshot.queryParamMap.has('installmentID')) {

                this.installmentID = +this._route.snapshot.queryParamMap.get('installmentID');
                this.addmissionService.getRecoredById(this.installmentID).subscribe((data)=>{
                    console.log('data => ',data);
                    
                    this.installmentModel = data;
                    
                });
            }

        }



    }

    payment() {

        // this._route.queryParamMap.subscribe(params =>{
        //     if (params.has('installmentID') && params.has('token')) {
        //         this.installmentID = +params.get('installmentID');
        //         this.token = !params.get('token');
        //     }
        // });
        if (confirm('Are you sure you want to Submit ?')) {


            this.showLoadingIndicator =true;
            this.display="block";

            if (this._route.snapshot.queryParamMap.has('installmentID')
                && this._route.snapshot.queryParamMap.has('token')) {

                this.installmentID = +this._route.snapshot.queryParamMap.get('installmentID');
                this.token = !!this._route.snapshot.queryParamMap.get('token');
            }

            if (this.token) {

                console.log("not first instalment id", this.installmentID + " " + this.token);
                this.invoicePreRequireData(this.installmentID);

            } else {

                this.addmissionService.create(this.admissionModel).subscribe((fisrtInstId) => {

                    //installment id of first instalment 
                    const instId = +fisrtInstId;
                    console.log("fisrtInstId :", instId);
                    //alert('Record Added Successfully');
                    //link parameter array first element is the path to the destination component
                    //this._router.navigate(['/invoice',fisrtInstId]);

                    this.invoicePreRequireData(instId);
                    // remove admissionModel from local storage 
                    localStorage.removeItem('admissionModel');

                }, error => {
                    throw error;
                });
            }

        } else {



        }




    }

    invoicePreRequireData(instId: number) {

        //get installment Details for given installment id
        this.addmissionService.getRecoredById(instId).subscribe((recieveInvoiceData) => {

            console.log("recieveInvoiceData :", recieveInvoiceData.registrationId + " " + recieveInvoiceData.courseName);
            this.dataForInvoice = new InvoiceModel();

            this.dataForInvoice.invoiceNo = "IN1000" + recieveInvoiceData.installmentId;
            this.dataForInvoice.receiptDate = recieveInvoiceData.installmentDate;
            this.dataForInvoice.regNo = "Reg-" + recieveInvoiceData.registrationId;
            this.dataForInvoice.fullName = recieveInvoiceData.firstName + " " + recieveInvoiceData.lastName;
            this.dataForInvoice.courseName = recieveInvoiceData.courseName;
            this.dataForInvoice.fee = recieveInvoiceData.feesAfterDiscount;
            this.dataForInvoice.installmentAmount = recieveInvoiceData.installmentAmount;
            this.dataForInvoice.remainingAmount = recieveInvoiceData.remainingAmount;

            this.dataForInvoice.paymentmode = this.model.paymentmode;
            this.dataForInvoice.paymentType = this.model.paymentType;
            this.dataForInvoice.checkNumber = this.model.checkNumber;
            this.dataForInvoice.checkDate = this.model.checkDate;

            this.dataForInvoice.expectedInstallmentId = recieveInvoiceData.expectedInstallmentId;//installment id

            console.log(" dataForInvoice ", this.dataForInvoice.invoiceNo + " " + this.dataForInvoice.regNo);

            this._invoiceservice.create(this.dataForInvoice).subscribe((data) => {
                //alert('Invoice Added Successfully');
                var invoiceID = +data;
                console.log("invoiceID after adding in db ", invoiceID);
                localStorage.removeItem('admissionModel');
                this._router.navigate(['/invoice', invoiceID]);
            });

        },
            error => {
                throw error;
            });

    }

    onCancel() {

        localStorage.removeItem('admissionModel');
        this._router.navigate(['/home']);
    }


}
