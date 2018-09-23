import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '@core/material.module';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';

import { RolesViewComponent } from './roles-view/roles-view.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';

import { RolesService } from './_shared/services/roles.service';
import { RoleState } from './_shared/state/role.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forFeature([
      RoleState
    ]),
    MaterialModule,
    RolesRoutingModule
  ],
  declarations: [
    RolesComponent,
    RolesViewComponent,
    RolesTableComponent,
    RoleAddComponent,
    RoleEditComponent,
    RoleDeleteComponent
  ],
  providers: [RolesService],
  entryComponents: [RoleDeleteComponent]
})
export class RolesModule { }
