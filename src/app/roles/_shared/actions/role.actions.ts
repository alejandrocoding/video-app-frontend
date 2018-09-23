import { CreateRoleDTO } from '../interfaces/create-role.dto';
import { UpdateRoleDTO } from '../interfaces/update-role.dto';

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

export class EditRole {
    static readonly type = '[ROLE] Edit';
    constructor(public payloadId: string, public payload: UpdateRoleDTO) { }
}

export class DeleteRole {
    static readonly type = '[ROLE] Delete';
    constructor(public payload: string) { }
}
