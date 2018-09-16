import { CreatePermissionDTO } from '../interfaces/create-permission.dto';
import { UpdatePermissionDTO } from '../interfaces/update-permission.dto';

export class FetchPermissions {
    static readonly type = '[PERMISSION] Fetch All';
}

export class FetchPermission {
    static readonly type = '[PERMISSION] Fetch One';
    constructor(public payload: string) { }
}

export class AddPermission {
    static readonly type = '[PERMISSION] Add';
    constructor(public payload: CreatePermissionDTO) { }
}

export class EditPermission {
    static readonly type = '[PERMISSION] Edit';
    constructor(public payloadId: string, public payload: UpdatePermissionDTO) { }
}

export class DeletePermission {
    static readonly type = '[PERMISSION] Delete';
    constructor(public payload: string) { }
}
