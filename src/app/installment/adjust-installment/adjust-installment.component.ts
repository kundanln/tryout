import { Component, OnInit,OnChanges, Output,EventEmitter, Input } from "@angular/core";
import { InstallmentDetail } from "../../_models";

@Component({

    selector: `adjust-installment`,
    templateUrl: 'adjust-installment.component.html'
})
export class AdjustInstallmentComponent implements OnInit{

 //   @Output()
//    notifyToAdmission:EventEmitter<Enquiry>=new EventEmitter<Enquiry>();
    //in the parent component we need to bind this custom notify event 

    dataList : InstallmentDetail[]=[];

    @Input()
    installmentList : InstallmentDetail[];


    

    constructor(
    ){ 
        this.dataList =this.installmentList;
        console.log("installmentList",this.installmentList);
        
    }

    //getter and setter for searchTerm
    // get searchTerm(): string {
    //     return this._searchterm;
    // }
    // set searchTerm(value: string) {
    //    this._searchterm = value;
    // }

    ngOnInit() {

    }
    
    // setDetails(model:Enquiry)
    // {
    //     this.currentEnquiry=model;
    //     //console.log(this.currentEnquiry);
    //     this.notifyToAdmission.emit(this.currentEnquiry);
    // }

}