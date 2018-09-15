import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';

import { AddPermission, EditPermission, DeletePermission, FetchPermissions } from '../actions/permission.actions';
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

    async ngxsOnInit(ctx: StateContext<PermissionStateModel>) {
        return ctx.dispatch(new FetchPermissions());
    }

    @Action(FetchPermissions)
    async fetchAll({ getState, patchState }: StateContext<PermissionStateModel>) {
        const state = getState();
        const permissions = await this.permissionsService.getAll().toPromise();
        patchState({ ...state, permissions });
    }


    // @Action(AddTodo)
    // feedAnimals(ctx: StateContext<TodoListModel>, action: AddTodo) {

    //     // ngxs will subscribe to the post observable for you if you return it from the action
    //     return this.http.post('/api/todo-list').pipe(

    //         // we use a tap here, since mutating the state is a side effect
    //         tap(newTodo) => {
    //             const state = ctx.getState();
    //             ctx.setState({
    //                 ...state,
    //                 todolist: [...state.todolist, newTodo]
    //             });
    //         }),
    //         // if the post goes sideways we need to handle it
    //         catchError(error => window.alert('could not add todo')), ;
    // )
    // }

    @Action(AddPermission)
    add({ getState, patchState }: StateContext<PermissionStateModel>, { payload }: AddPermission) {
        const state = getState();
        patchState({
            permissions: [...state.permissions, payload]
        });
    }

    @Action(EditPermission)
    edit({ getState, patchState }: StateContext<PermissionStateModel>, { payload }: EditPermission) {
        const state = getState();
        patchState({
            permissions: [...state.permissions.filter(permission => permission.id !== payload.id), payload]
        });
    }

    @Action(DeletePermission)
    remove({ getState, patchState }: StateContext<PermissionStateModel>, { payload }: DeletePermission) {
        // TODO: Delete permission from DB using the service and the sample up here.
        const state = getState();
        patchState({
            permissions: [...state.permissions.filter(permission => permission.id !== payload)]
        });
    }

}
