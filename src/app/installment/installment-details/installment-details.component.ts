import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, NgForm } from '@angular/forms';
//import { InstallmentDetail } from '../../_models';
import { DateCellRenderer } from './installment-date';
import { CurrencyCellRenderer } from './installment-currency';
import { PayInstallmentButton } from './pay-installment-button';
import { EditUpdateButton } from './edit-update-button';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { DueListService } from '../../_services/due-list.service';
import { InstallmentDetail } from '../../_models';

//import { InstallmentDetail } from 'src/app/_models';
//import { InstallmentDetail } from 'src/app/_models/installmentDetail';

@Component({
  selector: 'app-installment-details',
  templateUrl: './installment-details.component.html',
  styleUrls: ['./installment-details.component.css']
})
export class InstallmentDetailsComponent implements OnInit {

  installmentDetailsData: InstallmentDetail[];
  //  myForm: FormGroup;

  //buttons

  payButtonStatus: boolean;
  public buttonAddUpdate: string = "Add"
  public addButtonStatus: boolean = false;
  
  public saveAfterEditButtonStatus: boolean = true;

  //to applay ready only property on some input field
  public buttonStatus: boolean = false;

  //private payButtonStatus : boolean;

  private EditRowNode = null;
  //for model to show or hide
  display = 'none';

  datePickerConfig: Partial<BsDatepickerConfig>;


  public name: string;
  public course: string;
  public total: number;

  //form
  @ViewChild('modelForm')
  public modelFormref: NgForm;

  model: InstallmentDetail = {

    installmentNum: null,
    installmentDate: null,
    installmentAmount: null,
    regId: null,
    comment: null,
  }

  //ag-grid
  private gridApi;
  private gridColumnApi;
  public rowData: any[];
  public columnDefs;
  public rowDatas;
  public context;
  public frameworkComponents;
  public rowSelection;
  public getRowNodeId;
  public defaultColDef;

  private ediStatus: boolean = false;
  private oldValue: number;
  private newValue: number;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _dueListService: DueListService,
    public datepipe: DatePipe,
    private fb: FormBuilder) {


    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY/MM/DD',
        minDate : new Date(),
      }
    )

    this.columnDefs = [

      {
        headerName: "Number",
        field: "installmentNum",
        width: 70,
        filter:'agNumberColumnFilter',
        cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },

      },
      {
        headerName: "Date",
        field: "installmentDate",
        cellRenderer: "DateCellRenderer",
        colId: "installmentDate",
        width: 130,
        filter:'agTextColumnFilter',
                cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Amount",
        field: "installmentAmount",
        cellRenderer: "CurrencyCellRenderer",
        //editable: true,
        colId: "installmentAmount",
        width: 80,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Pay",
        cellRenderer: "payInstallmentButton",
        width: 45,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
      {
        headerName: "Edit",
        cellRenderer: "EditUpdateButton",
        width: 35,
        filter:'agNumberColumnFilter',
                cellClass:"number-cell",
        cellStyle: function(params) {
          if (params.node.rowIndex % 2 === 0) {return {backgroundColor: 'none'}; } 
          else { return {backgroundColor: '#E6E4E4'};}
         },
      },
    ];

    this.defaultColDef = {

      //stop editing other cell on tab navugation
      // suppressKeyboardEvent: function (event) {
      //   console.log("suppressing event", event);
      //   if (event.editing) return true;

      // },

    };

    //set rowNode Id as installmentNum
    this.getRowNodeId = function (data) {
      return data.installmentNum;
    };

    this.context = { componentParent: this };

    this.frameworkComponents = {
      DateCellRenderer: DateCellRenderer,
      CurrencyCellRenderer: CurrencyCellRenderer,
      payInstallmentButton: PayInstallmentButton,
      EditUpdateButton: EditUpdateButton
    };

    this.rowSelection = "single";

    this.installmentDetailsData = this._route.snapshot.data['installmentDetailsData'];
    // this._route.snapshot.data['installmentDetailsData'].subscribe(()=>{

      
    // })
    console.log("installmentDetails compo ", this.installmentDetailsData);
    //const regID=+_route.paramMap.get('regID');
  }//constructer close

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.rowData = this.installmentDetailsData;
    params.api.sizeColumnsToFit();

  };

  payMethodFromParent(cell) {
    const id = +cell;
    //expected installment id
    console.log("id");
    
    if(this.checkToatal()){
      this._router.navigate(['/payment'],{ queryParams : { 'installmentID' : id,'token' : true } });
    }else{
      alert("total installment amount are not matched");
    }
    
  }

  EditMethodCallFromChild(cell) {

    this.buttonAddUpdate = "Update"
    this.buttonStatus = true;
    const rowIndex = +cell;
    var rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
    this.openModal(rowNode);

  }
  addNewInstallment() {
    this.buttonAddUpdate = "Add"
    this.buttonStatus = false;
    this.openModal();
  }

  openModal(rowNode?) {

    this.display = 'block';
    if (this.buttonAddUpdate == "Add") {
      this.modelFormref.reset();
      var nextInstallmentNum = this.getNextInstallmentNum();
      this.model.installmentNum = nextInstallmentNum;
      this.model.comment=" ";

    } else if (this.buttonAddUpdate == "Update") {
      this.EditRowNode = rowNode;
      this.model.installmentNum = rowNode.data.installmentNum;
      this.model.installmentDate = this.datepipe.transform(rowNode.data.installmentDate, 'yyyy-MM-dd');
      this.model.installmentAmount = rowNode.data.installmentAmount;
    }
  }
  onCloseHandled() {
    //this.modelFormref.reset();
    this.display = 'none';
  }

  onAddUpdateRow() {

    if (this.buttonAddUpdate == 'Add') {

      this.model.installmentDate = this.datepipe.transform(this.model.installmentDate, 'yyyy-MM-dd');
      var newItem = Object.assign({}, this.model);
      var res = this.gridApi.updateRowData({ add: [newItem] });
      // this.gridApi.refreshCells();
      // printResult(res);
      this.saveAfterEditButtonStatus=false;
      this.onCloseHandled();
      
    }else if (this.buttonAddUpdate == 'Update') {

    
      var EditedRowNode = this.EditRowNode;
      EditedRowNode.setDataValue("installmentAmount", this.model.installmentAmount);
      //var res = this.gridApi.updateRowData({ update: EditedRowNode });
      //this.gridApi.refreshCells();
      // printResult(res);
      this.saveAfterEditButtonStatus=false;
      this.onCloseHandled();
    }

  }

  getNextInstallmentNum(): number {
    var nextInstallmentNum = this.getDisplayedRowCount();
    return nextInstallmentNum + 1;
  }

  getDisplayedRowCount() {
    var count = this.gridApi.getDisplayedRowCount();
    console.log("getDisplayedRowCount() => " + count);
    return count;
  }
  saveFullRowData() {
    var rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log("New Row Data:=>", rowData);
   

    if(this.checkToatal()){
      
      this.saveAfterEditButtonStatus = true;
      this._dueListService.UpdateInstallmentDetails(rowData).subscribe(()=>{
        alert("changes are updated");
    });
    }else{
      alert("total installment amount are not matched");
    }
    

  }
  ngOnInit() {
    //this.gridApi.setFunctionsReadOnly();
    if (this._route.snapshot.queryParamMap.has('name')
      && this._route.snapshot.queryParamMap.has('course')
      && this._route.snapshot.queryParamMap.has('total')) {

      this.name = this._route.snapshot.queryParamMap.get('name');
      this.course = this._route.snapshot.queryParamMap.get('course');
      this.total = +this._route.snapshot.queryParamMap.get('total');
      //console.log("report panel",this.name+" "+this.course+" "+this.total);
    }

    this._route.paramMap.subscribe(params => {
      this.model.regId = +params.get('regID');
      console.log("reg id",this.model.regId );
      
    })
  }

  checkToatal() : boolean {
    var rowData : InstallmentDetail[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    var totalInstallmentAmount=0;
    if(rowData && rowData.length!=0){

      rowData.forEach(element => {
        totalInstallmentAmount=totalInstallmentAmount+element.installmentAmount;

      });
    }

    if(this.total && this.total == totalInstallmentAmount){

      return true;
    }
    return false;
  }

  onAdd(){
    var rowData : InstallmentDetail[] = [];

    if(this.buttonAddUpdate == 'Add'){
      this.installmentDetailsData.push()
    }    
    


  }



}



var newCount = 1;
function createNewRowData() {
  var newData = {
    make: "Toyota " + newCount,
    model: "Celica " + newCount,
    price: 35000 + newCount * 17,
    zombies: "Headless",
    style: "Little",
    clothes: "Airbag"
  };
  newCount++;
  return newData;
}

function EditHeaderValueGetter(params) {
  console.log(params.location, " <= params.location ");

  switch (params.location) {
    case "header":
      return "Edit";
    case "save":
      return "Save";
    case "cancel":
      return "Cancel";

    default:
      return "Should never happen!";
  }
}

function printResult(res) {
  console.log("---------------------------------------");
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log("Added Row Node", rowNode);

    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log("Removed Row Node", rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log("Updated Row Node", rowNode);
    });
  }
}
