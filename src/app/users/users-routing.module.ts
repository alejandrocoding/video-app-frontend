import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children:
      [
        { path: '', component: UsersViewComponent },
        { path: 'add', component: UserAddComponent },
        { path: 'edit/:id', component: UserEditComponent },
        { path: '**', redirectTo: '/users' }
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
