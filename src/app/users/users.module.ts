import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UsersViewComponent,
    UsersTableComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeleteComponent
  ]
})
export class UsersModule { }
