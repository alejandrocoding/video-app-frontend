import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Role } from '../interfaces/role.interface';
import { CreateRoleDTO } from '../interfaces/create-role.dto';
import { UpdateRoleDTO } from '../interfaces/update-role.dto';

@Injectable()
export class RolesService {

    constructor(private readonly http: HttpClient) { }

    getAll() {
        return this.http.get<Role[]>(`${environment.api}/roles`);
    }

    getById(id: string) {
        return this.http.get<Role>(`${environment.api}/roles/${id}`);
    }

    create(dto: CreateRoleDTO) {
        return this.http.post<Role>(`${environment.api}/roles`, dto);
    }

    update(id: string, dto: UpdateRoleDTO) {
        return this.http.put<Role>(`${environment.api}/roles/${id}`, dto);
    }

    delete(id: string) {
        return this.http.delete<Role>(`${environment.api}/roles/${id}`);
    }

}
