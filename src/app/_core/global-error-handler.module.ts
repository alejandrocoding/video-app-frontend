import { NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
    providers: [
        GlobalErrorHandler,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class GlobalErrorHandlerModule { }
