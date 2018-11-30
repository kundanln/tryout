import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DueListService } from '../_services/due-list.service';

@Injectable()
export class InstallmentDetailsResolverService implements Resolve<any>{

    constructor(private _dueListService : DueListService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

        const regID=+route.paramMap.get('regID');
        console.log("InstallmentDetailsResolverService guard reg iD =>",regID);
        
        return this._dueListService.getAllInstallmentDetails(regID); 
    }
}