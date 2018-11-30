import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MainComponent } from './main-app/main.component';
import { AuthGuard } from './_guards';
import { HomeComponent } from './home';
import { CourseComponent } from './course-master';
import { CourseListComponent } from './course-master/course-list/course-list';
import { CourseAddComponent } from './course-master/course-add/course-add';
import { ProfileComponent } from './profile/profile.component';
import { EnquiryComponent } from './enquiry-master';
import { EnquiryAddComponent } from './enquiry-master/enquiry-add/enquiry-add';
import { EnquiryListComponent } from './enquiry-master/enquiry-list/enquiry-list';
import { admissionComponent } from './admission-master/admission.component';
import { PayModeComponent } from './admission-master/payment/payment-mode.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceIDResolverService } from './invoice/invoice-resolver.service';
import { DoEnquiryFallowUpComponent } from './followup/_do_enquiry-fallowUp/do-enquiry-fallowUp';
import { DoInstallmentFallowUpComponent } from './followup/_do_installment-fallowUp/do-installment-fallowUp';
import { AdmissionListComponent } from './admission-master/admission-list/admission-list.component';
import { DueListComponent } from './installment/due-list/due-list.component';
import { InstallmentDetailsResolverService } from './installment/installment-details-resolver.service';
import { InstallmentDetailsComponent } from './installment/installment-details/installment-details.component';
import { AdmissionReportPanelComponent } from './reports/admission/admission-report-panel.component';
import { CollectionReportPanelComponent } from './reports/collection/collection-report-panel.component';
import { ExpectedIncomeReportComponent } from './reports/expected-income/expected-income-report.component';
import { ExpectedIncomeDetails } from './reports/expected-income/expected-incomme-details/expected-income-details.component';
import { CollectionDetails } from './reports/collection/collection-details/collection-details.component';
import { InstallmentListComponent } from './admission-master/admission-list/installment-list/installment-list.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],

        children: [

            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard],

            },
            {
                path: 'cs',
                component: CourseComponent,
                canActivate: [AuthGuard],
                children: [

                    {
                        path: 'cs-list',
                        component: CourseListComponent
                    },
                    {
                        path: 'cs-add',
                        component: CourseAddComponent
                    }

                ]

            },
            {
                path: 'enquiry',
                component: EnquiryComponent,
                canActivate: [AuthGuard],
                children: [

                    {
                        path: 'enq-list',
                        component: EnquiryListComponent
                    },
                    {
                        path: 'enq-add',
                        component: EnquiryAddComponent
                    }

                ]
            },
            {
                 path: 'admission',
                 component: admissionComponent,
                 canActivate: [AuthGuard]
            },
            // {
            //     path: 'admissionPreview',
            //     component: AdmissionPreviewComponent,
            //     canActivate: [AuthGuard]
            // },
             {
                 path: 'payment',
                 component: PayModeComponent,
                 canActivate: [AuthGuard]
             },
            {
                 path: 'admissionList',
                 component: AdmissionListComponent,
                 canActivate: [AuthGuard]
             },



             {
                 path: 'dueList',
                 component: DueListComponent,
                 canActivate: [AuthGuard]
             },

            {
                path: 'do-enquiry',
                component: DoEnquiryFallowUpComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'do-installment',
                component: DoInstallmentFallowUpComponent,
                canActivate: [AuthGuard]
            },
             {
                 path: 'invoice/:id',
                 component: InvoiceComponent,
                 resolve: { invoicePrintData: InvoiceIDResolverService }
             },
            // {
            //     path: 'searchEnquiry',
            //     component: SearchEnquiryComponent,
            //     canActivate: [AuthGuard]
            // },

             {
                 path: 'installmentDetails/:regID',
                 component: InstallmentDetailsComponent,
                 resolve: { installmentDetailsData: InstallmentDetailsResolverService }
            },
            {
                path: 'installmentList/:regID',
                component: InstallmentListComponent,
                resolve: { installmentDetailsData: InstallmentDetailsResolverService }
            },
             {            
                 path: 'admissionReport',
                 component: AdmissionReportPanelComponent,
                 canActivate: [AuthGuard]

             },
             {
               
               path: 'collectionReport',
                component: CollectionReportPanelComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'collection-details',
                        component: CollectionDetails,
                    }
                ]

             },
             {
               
              path: 'expectedcollectionReport',
              component: ExpectedIncomeReportComponent,
              canActivate: [AuthGuard],
              children: [
                  {
                      path: 'expected-income-details',
                      component: ExpectedIncomeDetails,
                  }
              ]

             },

             { path: '**', redirectTo: '/home' }
        ]
    },

    // {
    //     path: 'error',
    //     component: GlobalErrorComponent
    // },
    // otherwise redirect to home

   // { path: '**', redirectTo: '/home' }

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });