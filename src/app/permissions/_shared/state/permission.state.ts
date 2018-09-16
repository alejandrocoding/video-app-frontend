import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators';

import { AddPermission, EditPermission, DeletePermission, FetchPermissions, FetchPermission } from '../actions/permission.actions';
import { Permission } from '../interfaces/permission.interface';
import { PermissionsService } from '../services/permissions.service';

export class PermissionStateModel {
    permissions: Permission[];
}

@State<PermissionStateModel>({
    name: 'permissions',
    defaults: {
        permissions: []
    }
})
export class PermissionState implements NgxsOnInit {

    constructor(private readonly permissionsService: PermissionsService) { }

    @Selector()
    static getAllPermissions(state: PermissionStateModel) {
        return state.permissions;
    }

    // TODO: Test/Investigate how this works and if it does work
    @Selector()
    static getPermissionById(state: PermissionStateModel, id: string) {
        return state.permissions.find(p => p.id === id);
    }

    async ngxsOnInit(ctx: StateContext<PermissionStateModel>) {
        return ctx.dispatch(new FetchPermissions());
    }

    @Action(FetchPermissions)
    async fetchAll({ getState, patchState }: StateContext<PermissionStateModel>) {
        const state = getState();
        const permissions = await this.permissionsService.getAll().toPromise();
        patchState({ ...state, permissions });
    }

    @Action(FetchPermission)
    fetchById({ getState, patchState }: StateContext<PermissionStateModel>, { payload }: FetchPermission) {
        return this.permissionsService.getById(payload).pipe(
            tap((fetchedPermission) => {
                const state = getState();
                patchState({
                    permissions: [...state.permissions.filter(permission => permission.id !== fetchedPermission.id), fetchedPermission]
                });
            })
        );
    }

    @Action(AddPermission)
    add({ getState, patchState }: StateContext<PermissionStateModel>, { payload }: AddPermission) {
        return this.permissionsService.create({ name: payload.name }).pipe(
            tap((createdPermission) => {
                const state = getState();
                patchState({
                    permissions: [...state.permissions, createdPermission]
                });
            })
        );
    }

    @Action(EditPermission)
    edit({ dispatch }: StateContext<PermissionStateModel>, { payloadId, payload }: EditPermission) {
        return this.permissionsService.update(payloadId, { name: payload.name }).pipe(
            tap(() => dispatch(new FetchPermission(payloadId)))
        );
    }

    @Action(DeletePermission)
    remove(ctx: StateContext<PermissionStateModel>, { payload }: DeletePermission) {
        return this.permissionsService.delete(payload).pipe(
            tap((deletedPermission) => {
                const state = ctx.getState();
                ctx.patchState({
                    permissions: [...state.permissions.filter(permission => permission.id !== deletedPermission.id)]
                });
            })
        );
    }
}
