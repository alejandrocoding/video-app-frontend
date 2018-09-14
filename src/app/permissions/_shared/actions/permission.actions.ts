import { Permission } from '../interfaces/permission.interface';

export class FetchPermissions {
    static readonly type = '[PERMISSION] Fetch';
}

export class AddPermission {
    static readonly type = '[PERMISSION] Add';
    constructor(public payload: Permission) { }
}

export class EditPermission {
    static readonly type = '[PERMISSION] Edit';
    constructor(public payload: Permission) { }
}

export class DeletePermission {
    static readonly type = '[PERMISSION] Delete';
    constructor(public payload: string) { }
}
