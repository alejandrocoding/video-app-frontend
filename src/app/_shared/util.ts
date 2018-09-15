import { MatDialogConfig } from '@angular/material';

export class Util {
    static getDialogConfig(): MatDialogConfig {
        return { width: '40vw', maxWidth: '450px', position: { top: '15vh' } };
    }
}
