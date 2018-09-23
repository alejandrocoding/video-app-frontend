import { Entity } from '@interfaces/index';

export interface Role extends Entity {
    name: string;
    permissionsId: string[];
    createdBy: any;
}
