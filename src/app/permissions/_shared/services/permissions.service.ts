import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

import { Permission } from '../interfaces/permission.interface';
import { CreatePermissionDTO } from '../interfaces/create-permission.dto';
import { UpdatePermissionDTO } from '../interfaces/update-permission.dto';

@Injectable()
export class PermissionsService {

    constructor(private readonly http: HttpClient) { }

    getAll() {
        return this.http.get<Permission[]>(`${environment.api}/permissions`);
    }

    getById(id: string) {
        return this.http.get<Permission>(`${environment.api}/permissions/${id}`);
    }

    create(dto: CreatePermissionDTO) {
        return this.http.post<Permission>(`${environment.api}/permissions`, dto);
    }

    update(id: string, dto: UpdatePermissionDTO) {
        return this.http.put<Permission>(`${environment.api}/permissions/${id}`, dto);
    }

    delete(id: string) {
        return this.http.delete<Permission>(`${environment.api}/permissions/${id}`);
    }

}
