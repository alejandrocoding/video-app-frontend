import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '@core/material.module';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

import { PermissionsViewComponent } from './permissions-view/permissions-view.component';
import { PermissionsTableComponent } from './permissions-table/permissions-table.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionDeleteComponent } from './permission-delete/permission-delete.component';

import { PermissionsService } from './_shared/services/permissions.service';
import { PermissionState } from './_shared/state/permission.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forFeature([
      PermissionState
    ]),
    MaterialModule,
    PermissionsRoutingModule
  ],
  declarations: [
    PermissionsComponent,
    PermissionsViewComponent,
    PermissionsTableComponent,
    PermissionAddComponent,
    PermissionEditComponent,
    PermissionDeleteComponent
  ],
  providers: [PermissionsService],
  entryComponents: [PermissionDeleteComponent]
})
export class PermissionsModule { }
