import { Course } from ".";

export class Enquiry {

    enqId ? : number;
    firstName: string;
    middleName: string;
    lastName: string;
    courses: Course[];
    address: string;
    highestQual: string;
    refferedBy: string;
    collegeName: string;
    studentProfession: string;
    organizationName: string;
    mobileNumber: string;
    emailAddress: string;
    comment: string;
    freezEnquery: string;
    addedBy ? : string;
    
    enquiryDate: String;  //Date
    birthDate: String;    //Date  
    followUpDate: string;
    addedOn ? : String;  //Date

   
}