import { Entity } from '@interfaces/index';
import { PermissionType } from '../enums/permission-type.enum';

export interface Permission extends Entity {
    name: string;
    type: PermissionType;
}
