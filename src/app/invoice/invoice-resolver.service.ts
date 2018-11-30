import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AddmissionService, InvoiceService } from '../_services';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceIDResolverService implements Resolve<any>{

    constructor(private _invoiceservice: InvoiceService,){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

        const InvoiceID=+route.paramMap.get('id');
        console.log("id for Invoice table",InvoiceID);
        return this._invoiceservice.getRecoredById(InvoiceID);
    }
}