import { CreateRoleDTO } from '../interfaces/create-role.dto';
import { UpdateRoleDTO } from '../interfaces/update-role.dto';
import { UpdateRolePermissionsDTO } from '../interfaces/update-role-permissions.dto';

export class FetchRoles {
    static readonly type = '[ROLE] Fetch All';
}

export class FetchRole {
    static readonly type = '[ROLE] Fetch One';
    constructor(public payload: string) { }
}

export class AddRole {
    static readonly type = '[ROLE] Add';
    constructor(public payload: CreateRoleDTO) { }
}

export class EditRoleName {
    static readonly type = '[ROLE] Edit Name';
    constructor(public payloadId: string, public payload: UpdateRoleDTO) { }
}

export class EditRolePermissionsId {
    static readonly type = '[ROLE] Edit Permissions Id';
    constructor(public payloadId: string, public payload: UpdateRolePermissionsDTO) { }
}

export class DeleteRole {
    static readonly type = '[ROLE] Delete';
    constructor(public payload: string) { }
}
