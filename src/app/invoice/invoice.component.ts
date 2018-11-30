import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from '../_models';
import { InvoiceService } from '../_services';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  // template: `<display-invoice [recieveInvoiceData]='dataForInvoice' #childComponent> </display-invoice>
  //       <div class="panel-footer">
  //           <button type="button" class="btn btn-default">Close</button>
  //           <button type="button" (click)="childComponent.submitAndPrint();" class="btn btn-primary pull-right">Print</button>
  //       </div>`,
  styleUrls: ['./invoice.component.css']
  //template: ` {{ dataForInvoice.id }} `

})
export class InvoiceComponent implements OnInit {

  dataForInvoice: InvoiceModel;
  printButton : boolean =true;

  constructor(private _route: ActivatedRoute,
              private _router: Router,) {

    this.dataForInvoice = this._route.snapshot.data['invoicePrintData'];
    console.log("InvoiceDetailModel from Db =>",this.dataForInvoice);
    
   
  }

  ngOnInit() {

    

  }

  submitAndPrint() {
    
    this.printButton=false;
    $('#condition_dependancy').toggle(this.printButton);
   

    //console.log("Invoice Form to submit ", this.model);
    this.actualPrint();
    
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

    //.invoice-box{max-width:800px;margin:auto;padding:30px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,.15);font-size:16px;line-height:24px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:center}.invoice-box table tr td:nth-child(3){text-align:right}.invoice-box table tr.information table td{padding-bottom:10px;}.headings{background:#eee;border-bottom:1px solid #ddd;font-weight:bold;display: block;}.logo{width:100%;max-width:200px;}input[type="text"] {border-top: 0;border-right: 0;border-left: 0;-webkit-box-shadow: none;box-shadow: none;}.noPrint{ display: none; }
    frameDoc.document.open();
    frameDoc.document.write('<html><head><style></style>');
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
    window.onafterprint= function myFunction(){
      $('#condition_dependancy').toggle();
    }
  }

navigateMe(){

  this._router.navigate(['/home']);

}

}
