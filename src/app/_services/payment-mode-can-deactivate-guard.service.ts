import { CanDeactivate } from "../../../node_modules/@angular/router";
import { PayModeComponent } from "../admission-master/payment/payment-mode.component";
//import { PayModeComponent } from "../admission-master/payment/payment-mode.component";

export class PaymentModeCanDeactivateGuardService implements CanDeactivate<PayModeComponent>{

    canDeactivate(component: PayModeComponent):  boolean{
        
        //if we want route naviagtion cancel return false
        //if we want allow route naviagation return true
        return true;

    }

}