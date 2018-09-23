import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class FormActivateGuard implements CanActivate{

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean
    {
        return confirm('Do you want to add a new patient?');
    }
}