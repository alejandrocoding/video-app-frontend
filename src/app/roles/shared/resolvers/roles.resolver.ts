import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Role } from '../interfaces/role.interface';

@Injectable()
export class RolesResolver implements Resolve<Role> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        // TODO: To remove resolver
        return true;
    }
}

