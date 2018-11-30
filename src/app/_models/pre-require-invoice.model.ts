export class PreRequireInvoiceModel {
    //InvoiceQueryModel from db

    installmentId: number;
    installmentNum: number;
    installmentAmount: number;
    installmentDate: Date;
    registrationId: number;
    remainingAmount: number;
    feesAfterDiscount: number;
    percentageDiscount: number;
    numOfInstallment: number;
    firstName: String;
    middleName: String;
    lastName: String;
    courseName: String;
    courseFee: number;
    mobileNumber: number;
    expectedInstallmentId: number;

}