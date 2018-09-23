import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Actions, ofActionDispatched, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { tap, take } from 'rxjs/internal/operators';

import { AddRole, EditRole, DeleteRole, FetchRoles, FetchRole } from '../actions/role.actions';
import { Role } from '../interfaces/role.interface';
import { RolesService } from '../services/roles.service';

export class RoleStateModel {
    roles: Role[];
    loading: boolean;
}

@State<RoleStateModel>({
    name: 'roles',
    defaults: {
        roles: [],
        loading: false
    }
})
export class RoleState implements NgxsOnInit {

    constructor(
        private readonly actions$: Actions,
        private readonly rolesService: RolesService) {
    }

    @Selector()
    static getAllRoles(state: RoleStateModel) {
        return state.roles;
    }

    @Selector()
    static isLoading(state: RoleStateModel) {
        return state.loading;
    }

    ngxsOnInit(ctx: StateContext<RoleStateModel>) {
        this.handleEffects(ctx);
        return ctx.dispatch(new FetchRoles());
    }

    private handleEffects({ getState, patchState }: StateContext<RoleStateModel>) {
        this.actions$.pipe(ofActionDispatched(FetchRoles), take(1)).subscribe(() => patchState({ ...getState(), loading: true }));
        this.actions$.pipe(ofActionSuccessful(FetchRoles), take(1)).subscribe(() => patchState({ ...getState(), loading: false }));
        this.actions$.pipe(ofActionErrored(FetchRoles), take(1)).subscribe(() => patchState({ ...getState(), loading: false }));
    }

    @Action(FetchRoles)
    async fetchAll({ getState, patchState }: StateContext<RoleStateModel>) {
        const state = getState();
        const roles = await this.rolesService.getAll().toPromise();
        patchState({ ...state, roles });
    }

    @Action(FetchRole)
    fetchById({ getState, patchState }: StateContext<RoleStateModel>, { payload }: FetchRole) {
        return this.rolesService.getById(payload).pipe(
            tap((fetchedRole) => {
                const state = getState();
                patchState({
                    roles: [...state.roles.filter(permission => permission.id !== fetchedRole.id), fetchedRole]
                });
            })
        );
    }

    @Action(AddRole)
    add({ getState, patchState }: StateContext<RoleStateModel>, { payload }: AddRole) {
        return this.rolesService.create({ name: payload.name, permissionsId: payload.permissionsId, createdBy: payload.createdBy }).pipe(
            tap((createdRole) => {
                const state = getState();
                patchState({
                    roles: [...state.roles, createdRole]
                });
            })
        );
    }

    @Action(EditRole)
    edit({ dispatch }: StateContext<RoleStateModel>, { payloadId, payload }: EditRole) {
        return this.rolesService.update(payloadId, { name: payload.name, permissionsId: payload.permissionsId }).pipe(
            tap(() => dispatch(new FetchRole(payloadId)))
        );
    }

    @Action(DeleteRole)
    remove(ctx: StateContext<RoleStateModel>, { payload }: DeleteRole) {
        return this.rolesService.delete(payload).pipe(
            tap((deletedRole) => {
                const state = ctx.getState();
                ctx.patchState({
                    roles: [...state.roles.filter(permission => permission.id !== deletedRole.id)]
                });
            })
        );
    }
}
