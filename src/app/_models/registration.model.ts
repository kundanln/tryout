import { Course } from "./course";
import { InstallmentDetail } from '../_models';

export class RegistrationModel {

    id : number;
    fees : number;
    feesAfterDiscount : number;
    percentageDiscount : number;
    numOfInstallment : number;
    //studentPDetailsModel = studentPDetailsModel;
    course : Course;
    installmentDetail : InstallmentDetail[];
    addedBy?: string;
    addedOn?: string;
    courseName? : string;
}