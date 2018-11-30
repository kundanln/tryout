import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from '../_models';
import { InvoiceService } from '../_services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'display-invoice',
  templateUrl: './display-invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class DisplayInvoiceComponent implements OnInit {

    @Input() 
    recieveInvoiceData : any;


  //admissionData: any;
  model: InvoiceModel = {
    
    invoiceNo: null,
    receiptDate: null,
    regNo: null,
    fullName: null,
    courseName: null,
    fee: null,
    installmentAmount: null,
    remainingAmount: null,

    paymentmode: null,
    paymentType: null,
    checkNumber: null,
    checkDate: null,
    
    nextInstallmentDate: null,
    comment: null,
    expectedInstallmentId: null,

  };


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _invoiceservice: InvoiceService,
    private datePipe: DatePipe) {

    //this.admissionDatas = this._route.snapshot.data['admissionData'];
    
    console.log('recieve invoice data ',this.recieveInvoiceData);

    this.model.invoiceNo = "IN1000" + this.recieveInvoiceData.installmentId;
    this.model.receiptDate = this.recieveInvoiceData.installmentDate;
    this.model.regNo = "Reg-" + this.recieveInvoiceData.registrationId;
    this.model.fullName = this.recieveInvoiceData.firstName + " " + this.recieveInvoiceData.lastName;
    this.model.courseName = this.recieveInvoiceData.courseName;
    this.model.fee = this.recieveInvoiceData.feesAfterDiscount;
    this.model.installmentAmount = this.recieveInvoiceData.installmentAmount;
    this.model.remainingAmount = this.recieveInvoiceData.remainingAmount;

    this.model.paymentmode = "cash";
    this.model.paymentType = "installment";
    this.model.expectedInstallmentId = this.recieveInvoiceData.expectedInstallmentId;//installment id
  }

  ngOnInit() {
  }


  submitAndPrint() {

    //console.log("Invoice Form to submit ", this.model);
    this.actualPrint();
    
    this._invoiceservice.create(this.model).subscribe((data) => {
      alert('Invoice Added Successfully');
      this._router.navigate(['/home']);
    },
    error=>{
      throw error;
    });

    // let popupWinindow;
    // let innerContents = document.getElementById('printSectionId').innerHTML;
    // popupWinindow = window.open('', '_blank', 'width=800,height=9000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    // popupWinindow.document.open();
    // popupWinindow.document.write(`<html>
    //                                 <head>
    //                                   <link rel="stylesheet" type="text/css" href="style.css" />
    //                                 </head>
    //                                   <body onload="window.print()">` + innerContents +
    //                               `</html>`);
    // popupWinindow.document.close();
  }

  actualPrint(): void {

    let innerContents = document.getElementById('printSectionId').innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame3";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow;// ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;

    // var originalContents = frameDoc.document.body.innerHTML;
    // frameDoc.document.body.innerHTML = innerContents;

    frameDoc.document.open();
    frameDoc.document.write('<html><head> <style>.invoice-box{max-width:800px;margin:auto;padding:30px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,.15);font-size:16px;line-height:24px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:center}.invoice-box table tr td:nth-child(3){text-align:right}.invoice-box table tr.information table td{padding-bottom:10px;}.headings{background:#eee;border-bottom:1px solid #ddd;font-weight:bold;display: block;}.logo{width:100%;max-width:200px;}input[type="text"] {border-top: 0;border-right: 0;border-left: 0;-webkit-box-shadow: none;box-shadow: none;}.noPrint{ display: none; }</style>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(innerContents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["frame3"].focus();
      // window.frames["frame3"].print();
      window.print();
      // frameDoc.document.body.innerHTML = originalContents;
      document.body.removeChild(frame1);
    }, 500);

  }
}
