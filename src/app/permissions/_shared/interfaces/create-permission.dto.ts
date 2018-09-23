import { PermissionType } from '../enums/permission-type.enum';

export interface CreatePermissionDTO {
    name: string;
    type: PermissionType;
}
