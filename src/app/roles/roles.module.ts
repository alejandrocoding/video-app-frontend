import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesViewComponent } from './roles-view/roles-view.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule
  ],
  declarations: [RolesComponent, RolesViewComponent, RolesTableComponent, RoleAddComponent, RoleEditComponent, RoleDeleteComponent]
})
export class RolesModule { }
