import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersResolver implements Resolve<User> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        // TODO: To implement
        return true;
    }
}

