import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Video } from '../interfaces/video.interface';

@Injectable()
export class VideoResolver implements Resolve<Video> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        // TODO: To implement
        return true;
    }
}

