import { Component, OnInit, ViewChild } from "@angular/core";
import { Enquiry, Course, InstallmentDetail, UserModel } from "../_models";
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn, FormControl } from "@angular/forms";
import { CourseService } from "../_services/course.service";
import { AddmissionService } from "../_services/admission.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { admissionModel } from "../_models/admission.model";
import { BsDatepickerConfig } from "../../../node_modules/ngx-bootstrap/datepicker";
import { RegistrationModel } from "../_models/registration.model";


@Component({

    
    templateUrl: 'admission.component.html',
    styleUrls: ['./admission.component.css']
    // input.ng-invalid { border-left : 5px solid red; }
    // input.ng-valid { border-left : 5px solid green;}
})
export class admissionComponent implements OnInit {

    display = 'none';
    dataFromSearch: Enquiry;
    previewForm: boolean = false;
    invoiceCD: Course;
    admissionModel: admissionModel =new admissionModel();
    registrationModel: RegistrationModel=new RegistrationModel();
    registrationModelList: RegistrationModel[]=[];
    installmentModelList: InstallmentDetail[]=[];
    
    installmentModel: InstallmentDetail;


    EditModel: admissionModel;

    currentUser: UserModel;
    field2HasError: boolean;
    installmentData: InstallmentDetail[];
    datePickerConfig: Partial<BsDatepickerConfig>;


    //set data from search component to dataFromSearch  variable 
    NotifyFromSearch(eventData: Enquiry) {
        this.dataFromSearch = eventData;
        //console.log("selected search object  :-", this.dataFromSearch);
        //console.log("search object  :-", this.dataFromSearch.firstName);
        this.ngOnChanges11();

    }

    userForm: FormGroup;



    //personel detail
    firstName: String;
    middleName: String;
    lastName: String;
    address: String;
    mobileNumber: String;
    emailAddress: String;
    organization: String;
    studentProfession: String;

    //registration detail
    courseList: Course[] = [];

    feesAfterDiscount: number;
    maxDiscount: number;
    fees: number;
    percentageDiscount: number;
    numOfInstallment: number;
    course: Course;

    logInDate: Date = new Date();

    addedBy: string;
    addedOn: string;

    //table 
    column1: string = "Installment Number";
    column2: string = "Installment Amount";
    //  column3: string = "Remaining amount";
    column4: string = "Installment Date";
    column5: string = "Comment";

    
    constructor(private CourseService: CourseService,
        private _fb: FormBuilder,
        private addService: AddmissionService,
        private _router: Router,
        private datepipe: DatePipe,
        private _route: ActivatedRoute,
    ) {

        //console.log('currentUser',localStorage.getItem('currentUser'));
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.addedBy = this.currentUser.firstName + " " + this.currentUser.lastName;
        this.addedOn = this.datepipe.transform(this.logInDate, 'yyyy-MM-dd');

        this.datePickerConfig = Object.assign({}, {
            containerClass: 'theme-dark-blue',
            showWeekNumbers: true,
            minDate: new Date(),
            // maxDate : new Date(2018,8,30),
            dateInputFormat: 'YYYY/MM/DD',
        }
        )
    }

    EmptyAdmissionModel(){

        //new admissionModel()

    }

    ngOnInit() {

        this.loadCourses();

        this.userForm = this._fb.group({

            firstName: [, [Validators.required]],
            middleName: [, [Validators.required]],
            lastName: [, [Validators.required]],
            address: [, [Validators.required]],
            // pincode: [],
            mobileNumber: [, [Validators.required]],
            emailAddress: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
            organization: [, [Validators.required]],
            studentProfession: [, [Validators.required]],

            registrationModelList: this._fb.array([

                this.initRegistrationModel()

            ])

        })
        //max discount validation
        const percentageDiscountControl = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('percentageDiscount') //as FormArray;
        percentageDiscountControl.setValidators(this.lessThan());
        //this.userForm.controls.registrationModelList[0].controls.percentageDiscount.setValidators(this.lessThan());

        // (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('percentageDiscount').valueChanges.subscribe(() =>{
        //     if ((<FormArray>this.userForm.controls['registrationModelList']).at(0).get('percentageDiscount').hasError('greaterThan')) {
        //         this.field2HasError = true;
        //     } else {
        //         this.field2HasError = false;
        //     }
        // });


        const installmentDetailControl = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail') as FormArray;
        for (var i = 0; i < installmentDetailControl.length; i++) {
            // this.addNewInstallmentRow();
            //   const control = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail') as FormArray;
            var control = (<FormControl>installmentDetailControl[i].installmentAmount)
            control.setValidators(this.lessThanTotal());
        }

        // const installmentDetailControl = (<FormArray>(<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail')).at(1).get('installmentAmount');
        // installmentDetailControl.setValidators(this.lessThanTotal());

        // this.EditModel = JSON.parse(localStorage.getItem('admissionModel'));
        // if (this._route.snapshot.queryParamMap.has('edit')) {

        //     var editStatus = !!this._route.snapshot.queryParamMap.get('edit');
        // }
        // if(this.EditModel && editStatus){
        //     this.admissionModel = Object.assign({},this.EditModel);
        //     console.log("okkkk ",this.admissionModel);

        //     this.registrationModel=this.admissionModel.registrationModelList;
        //     this.registrationModel.forEach(element => {

        //         console.log('regModel fes',element.fees);

        //     });

        //     this.userForm.patchValue({
        //         firstName: this.admissionModel.firstName,

        //     });
        // }
    }
    initRegistrationModel() {
        return this._fb.group({

            course: [, [Validators.required]],
            fees: [, [Validators.required]],
            percentageDiscount: [, [Validators.required]],
            feesAfterDiscount: [, [Validators.required]],
            numOfInstallment: [, [Validators.required]],
            addedBy: [this.addedBy],
            addedOn: [this.addedOn],
            installmentDetail: this._fb.array([])   //this.initInstallmentModel()
        })
    }

    initInstallmentModel(i) {  // set default todays  date for first installment 
        if (i === 1) {

            return this._fb.group({
                installmentNum: [i],
                installmentAmount: [, [Validators.required,]],
                installmentDate: [this.logInDate, [Validators.required]], // set default todays  date for first installment 
                comment: []
            })

        } else {
            return this._fb.group({
                installmentNum: [i],
                installmentAmount: [, [Validators.required]],
                installmentDate: [, [Validators.required]],
                comment: []
            })
        }

    }
    lessThan(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const group = control.parent;
            //   const fieldToCompare = group.get(field);
            const isGreaterThan = Number(this.maxDiscount) < Number(control.value);
            return isGreaterThan ? { 'greaterThan': { value: control.value } } : null;
        }
    }
    lessThanTotal(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const group = control.parent;
            //   const fieldToCompare = group.get(field);
            const isGreaterThan = Number(this.feesAfterDiscount) < Number(control.value);
            return isGreaterThan ? { 'greaterthan': { value: control.value } } : null;
        }
    }



    // addNewInstallmentRow() {
    //     const control = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail') as FormArray;
    //     control.push(this.initInstallmentModel());

    // }


    ngOnChanges11() {
        setTimeout(() => this.userForm.patchValue({

            firstName: this.dataFromSearch.firstName,
            middleName: this.dataFromSearch.middleName,
            lastName: this.dataFromSearch.lastName,
            address: this.dataFromSearch.address,
            mobileNumber: this.dataFromSearch.mobileNumber,
            emailAddress: this.dataFromSearch.emailAddress,
            organization: this.dataFromSearch.organizationName,
            studentProfession: this.dataFromSearch.studentProfession,

        }), 0);
    }

    save() {

        this.admissionModel = Object.assign({}, this.userForm.value);

        // var regModel = this.admissionModel.registrationModelList;
        this.registrationModelList = this.admissionModel.registrationModelList;

        var userEnterTotalInstAmount = 0;
        var payablefee = 0;

        this.registrationModelList.forEach(element => {
            //var instModel = element.installmentDetail;
            this.registrationModel=element;
            var courses=element.course;
            this.registrationModel.courseName = courses.courseName;
            this.installmentModelList= element.installmentDetail;
            this.installmentModelList.forEach(element1 => {
                userEnterTotalInstAmount = element1.installmentAmount + userEnterTotalInstAmount;

            });
            payablefee = element.feesAfterDiscount;
            //console.log("userEnterTotalInstAmount ",userEnterTotalInstAmount);
        });
        //console.log("admission modelin admission compo =>",this.admissionModel.registrationModelList);

        if (payablefee != userEnterTotalInstAmount) {
            alert("total installment amount is not match with fees after discount !");
            //this.userForm.invalid;
        } else {
            //this.previewForm = !this.previewForm;
            //localStorage.setItem('admissionModel', JSON.stringify(this.admissionModel));
            //this._router.navigate(['/admissionPreview']);
            console.log("befor model open",this.admissionModel);
            
            this.openModal();
        }

        // this.admissionModel=this.userForm.value;
        // console.log("admissionModel =>",this.admissionModel);
        // alert('Record save Successfully'); 
        // this.userForm.get('course').disable();
        //this.userForm.controls.registrationModelList.get('course').disable();
        //this.userForm.controls['registrationModelList'].value[0].course.disable();
    }

    EditForm() {
        this.previewForm = !this.previewForm;
        //this.userForm.get('course').enable();
        //this.userForm.controls.registrationModelList.get('course').enable();
    }
    openModal() {
        this.display = 'block';
    }
    onCloseHandled() {
        this.display = 'none';
    }
    
    onReset(){

        this.userForm.reset();

    }
    onSubmit() {
        console.log("registration values ", this.userForm.controls['registrationModelList'].value["0"].course);
        console.log("reg Array1 : ", this.userForm.controls['registrationModelList'].value["0"].installmentDetail["0"]);

        //this.invoiceCD=this.userForm.controls['registrationModelList'].value["0"].course;
        //this.admissionModel = this.userForm.value;

        
        console.log("befor payment-mode screen =>",this.admissionModel);
        localStorage.setItem('admissionModel', JSON.stringify(this.admissionModel));
        this._router.navigate(['/payment']);

        // this.addService.create(this.userForm.value).subscribe((data) => {

        //     //last inserted invoice id 
        //     //installment id of first instalment 
        //     const fisrtInstId=+data;
        //     console.log("status :",data);
        //     alert('Record Added Successfully'); 
        //     //link parameter array first element is the path to the destination component
        //     this._router.navigate(['/invoice',fisrtInstId]);

        // },
        // error=>{
        //     throw error;
        // });
    }

    private loadCourses() {
        this.CourseService.getAll().subscribe((data: Course[]) => {
            this.courseList = data;
               console.log("dropdown list data", this.courseList);
        },
            error => {
                throw error;
            })
    }
    onSelect(courseData) {

        this.maxDiscount = courseData.maxDiscount;
        this.fees = courseData.fees;
        this.feesAfterDiscount = null;
        this.percentageDiscount = null;

    }
    feesAfterDiscountFun(discount) {
        this.feesAfterDiscount = this.fees - (this.fees * discount / 100);
    }

    createInstallmentTable(insNum) {
        const control = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail') as FormArray;

        //control.setValidators(this.lessThan());
        // to clear installment from array 
        for (var i = control.length; i >= 0; i--) {
            control.removeAt(0);
        }

        //to add installment based on selected number of installment 
        for (var i = 1; i <= insNum; i++) {
            // this.addNewInstallmentRow();
            //   const control = (<FormArray>this.userForm.controls['registrationModelList']).at(0).get('installmentDetail') as FormArray;
            control.push(this.initInstallmentModel(i));
        }

    }
    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 10);
    }
    

}