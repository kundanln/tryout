
export class InvoiceModel
{
    id ?: number;
    invoiceNo : String;
    receiptDate : Date;
    regNo :String;
    fullName: String;
    courseName: String;
    fee : number;
    installmentAmount: number;
    remainingAmount : number;
    paymentmode: String;
    checkNumber ? : String;
    checkDate ? : Date;
    nextInstallmentDate ? : Date;
    paymentType : String; 
    comment ? : String;
    expectedInstallmentId ? : number;
}