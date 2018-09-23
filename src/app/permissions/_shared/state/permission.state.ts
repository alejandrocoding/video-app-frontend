import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Actions, ofActionDispatched, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { tap, take } from 'rxjs/internal/operators';

import { AddPermission, EditPermission, DeletePermission, FetchPermissions, FetchPermission } from '../actions/permission.actions';
import { Permission } from '../interfaces/permission.interface';
import { PermissionsService } from '../services/permissions.service';

export class PermissionStateModel {
    permissions: Permission[];
    loading: boolean;
}

@State<PermissionStateModel>({
    name: 'permissions',
    defaults: {
        permissions: [],
        loading: false
    }
})
export class PermissionState implements NgxsOnInit {

    constructor(
        private readonly actions$: Actions,
        private readonly permissionsService: PermissionsService) {
    }

    @Selector()
    static getAllPermissions(state: PermissionStateModel) {
        return state.permissions;
    }

    @Selector()
    static isLoading(state: PermissionStateModel) {
        return state.loading;
    }

    // TODO: Test/Investigate how this works and if it does work
    @Selector()
    static getPermissionById(state: PermissionStateModel, id: string) {
        return state.permissions.find(p => p.id === id);
    }

    ngxsOnInit(ctx: StateContext<PermissionStateModel>) {
        this.handleEffects(ctx);
        return ctx.dispatch(new FetchPermissions());
    }

    private handleEffects({ getState, patchState }: StateContext<PermissionStateModel>) {
        this.actions$.pipe(ofActionDispatched(FetchPermissions), take(1)).subscribe(() => patchState({ ...getState(), loading: true }));
        this.actions$.pipe(ofActionSuccessful(FetchPermissions), take(1)).subscribe(() => patchState({ ...getState(), loading: false }));
        this.actions$.pipe(ofActionErrored(FetchPermissions), take(1)).subscribe(() => patchState({ ...getState(), loading: false }));
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
        const { name, type } = payload;
        return this.permissionsService.create({ name, type }).pipe(
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
        const { name } = payload;
        return this.permissionsService.update(payloadId, { name }).pipe(
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
