import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';

//datpicker 
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '../../node_modules/@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown'; 

//user defined component
import { AppComponent } from './app.component';
import { MainComponent } from './main-app/main.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UserService } from './_services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { CourseComponent } from './course-master';
import { CourseAddComponent } from './course-master/course-add/course-add';
import { CourseListComponent } from './course-master/course-list/course-list';
import { EnquiryComponent } from './enquiry-master';
import { EnquiryListComponent } from './enquiry-master/enquiry-list/enquiry-list';
import { EnquiryAddComponent } from './enquiry-master/enquiry-add/enquiry-add';
import { admissionComponent } from './admission-master/admission.component';
import { AdmissionListComponent } from './admission-master/admission-list/admission-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdjustInstallmentComponent } from './installment/adjust-installment/adjust-installment.component';
import { DueListComponent } from './installment/due-list/due-list.component';
import { EditUpdateButton } from './installment/installment-details/edit-update-button';
import { InstallmentDetailsComponent } from './installment/installment-details/installment-details.component';


//guard service
import { AuthGuard } from './_guards';
import { HomeComponent } from './home';
import { CourseService } from './_services/course.service';
import { EnquiryService } from './_services/enquiry.service';
import { AddmissionService} from './_services/admission.service';
import { InvoiceIDResolverService } from './invoice/invoice-resolver.service';
import { InvoiceService } from './_services/invoice.service';
import { DoFallowUpService } from './_services/do-fallowUp.service';
import { FollowUpService } from './_services/FollowUp.service';
import { DueListService } from './_services/due-list.service';
import { InstallmentDetailsResolverService } from './installment/installment-details-resolver.service';
import {TabsModule} from "ngx-tabs";

//ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { CourseEditButtonComponent } from './course-master/course-list/cs-edit-button.component';
import { EnquiryEditButtonComponent } from './enquiry-master/enquiry-list/edit-button.component';
import { ConcateName } from './enquiry-master/enquiry-list/concate-name';
import { CourseNameRenderer } from './enquiry-master/enquiry-list/course-name';
import { CourseDeleteButtonComponent } from './course-master/course-list/cs-delete-button.component';
import { SearchEnquiryComponent } from './searchEnquiry/SearchEnquiryComponent';
import { PayModeComponent } from './admission-master/payment/payment-mode.component';
import { DoEnquiryFallowUpComponent } from './followup/_do_enquiry-fallowUp/do-enquiry-fallowUp';
import { DoInstallmentFallowUpComponent } from './followup/_do_installment-fallowUp/do-installment-fallowUp';
import { DaysSettingService } from './daysConfig/DaysSettingService';

import { FallowUpButton } from './followup/fallowup-button.component';
import { EnquiryComentsButton } from './followup/comment-button.component';
import { GenrateInvoiceButton } from './admission-master/admission-list/installment-list/genrate-invoice-button';
import { EnquiryFollowupComponent } from './followup/enquiry-followup.component';
import { InstallmentFollowupComponent } from './followup/installment-followup.component';
import { MultipleCourseRenderer } from './followup/multiple-course';

import { DateCellRenderer } from './installment/installment-details/installment-date';

import { InstallmentButton } from './installment/installment-button.component';
import { PayInstallmentButton } from './installment/installment-details/pay-installment-button';
import { CurrencyCellRenderer } from './installment/installment-details/installment-currency';
import { PaymentModeCanDeactivateGuardService } from './_services/payment-mode-can-deactivate-guard.service';
import { AdmissionReportPanelComponent } from './reports/admission/admission-report-panel.component';
import { CollectionReportPanelComponent } from './reports/collection/collection-report-panel.component';
import { ExpectedIncomeReportComponent } from './reports/expected-income/expected-income-report.component';
import { CollectionDetails } from './reports/collection/collection-details/collection-details.component';
import { ExpectedIncomeDetails } from './reports/expected-income/expected-incomme-details/expected-income-details.component';
import { ReportService } from './_services/report.service';
import { InvoiceButton } from './admission-master/admission-list/invoiceButton';
import { InstallmentListComponent } from './admission-master/admission-list/installment-list/installment-list.component';
import { DisplayInvoiceComponent } from './invoice/display-invoice.component';
import { DateTimeFormatPipe } from './pipe/datePipe';
import { InstallmentFallowUpButton } from './followup/installment-fallowup-button';



@NgModule({
  declarations:
    [
      AppComponent,
      MainComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      ProfileComponent,
      CourseComponent,
      CourseAddComponent,
      CourseListComponent,
      EnquiryComponent,
      EnquiryListComponent,
      EnquiryAddComponent,
      CourseDeleteButtonComponent,
      InstallmentListComponent,
      DisplayInvoiceComponent,
      DateTimeFormatPipe,
      //ag-grid
      CourseEditButtonComponent,
      DoEnquiryFallowUpComponent,
      DoInstallmentFallowUpComponent,
      CourseNameRenderer,
      admissionComponent,
      SearchEnquiryComponent,
      AdmissionListComponent,
      PayModeComponent,
      InvoiceComponent,
      EnquiryFollowupComponent,
      InstallmentFollowupComponent,
      MultipleCourseRenderer,
      EnquiryEditButtonComponent,
      ConcateName,
      GenrateInvoiceButton,
      FallowUpButton,
      EnquiryComentsButton,
      AdjustInstallmentComponent,
      DueListComponent,
      EditUpdateButton,
      PayInstallmentButton,
      DateCellRenderer,
      InstallmentDetailsComponent,
      InstallmentButton,
      CurrencyCellRenderer,
      AdmissionReportPanelComponent,
      CollectionReportPanelComponent,
      ExpectedIncomeReportComponent,
      CollectionDetails,
      ExpectedIncomeDetails,
      InvoiceButton,
      InstallmentFallowUpButton
      
    ],
    

  imports:
    [
      Angular2FontawesomeModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      HttpModule,
      routing,
      AngularMultiSelectModule,
      ReactiveFormsModule,
      TabsModule,
      NgbModule.forRoot(),
      BsDatepickerModule.forRoot(),
      AgGridModule.withComponents(
        [
          CourseEditButtonComponent,
          EnquiryEditButtonComponent,
          ConcateName,
          CourseNameRenderer,
          CourseDeleteButtonComponent,
          GenrateInvoiceButton,
          FallowUpButton,
          InstallmentFallowUpButton,
          EnquiryComentsButton,
          MultipleCourseRenderer,
          InstallmentButton,
          CurrencyCellRenderer,
          DateCellRenderer,
          PayInstallmentButton,
          EditUpdateButton,
          InvoiceButton      
          
        ]),
        BsDatepickerModule.forRoot(),
        
    ],

  providers:
    [
      UserService,
      AuthGuard,
      DatePipe,
      CourseService,
      EnquiryService,
      AddmissionService,
      InvoiceService,
      InvoiceIDResolverService,
      DoFallowUpService,
      FollowUpService,
      DaysSettingService,
      DueListService,
      InstallmentDetailsResolverService,
      PaymentModeCanDeactivateGuardService,
      ReportService

    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
