import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(response: HttpErrorResponse | Error): void {

        if (environment.production) {
            return;
        }

        if (response instanceof HttpErrorResponse) {
            console.log('HTTPERROR:');
            console.log(response.error.error + ' --- ' + response.error.statusCode);
        } else if (response instanceof Error) {
            console.log('ERROR:');
        }
    }
}
