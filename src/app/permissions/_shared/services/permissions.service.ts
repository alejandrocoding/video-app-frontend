import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environment';
import { Permission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionsService {

    constructor(private readonly http: HttpClient) { }

    getAll() {
        return this.http.get<Permission[]>(`${environment.api}/permissions`);
    }

}
