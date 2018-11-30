import { RegistrationModel } from "./registration.model";

export class admissionModel{

    
    studId ?: number;
    firstName : String;
    middleName : String;
    lastName : String;
    studentImgPath : String;
    address : String;
    pincode : number;
    mobileNumber : number;
    emailAddress : String;
    organization : String;
    studentProfession : String;
    registrationModelList : RegistrationModel[];
}