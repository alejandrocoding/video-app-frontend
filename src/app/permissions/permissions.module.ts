import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

import { PermissionsViewComponent } from './permissions-view/permissions-view.component';
import { PermissionDeleteComponent } from './permission-delete/permission-delete.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionsTableComponent } from './permissions-table/permissions-table.component';

import { PermissionsService } from './_shared/services/permissions.service';
import { PermissionState } from './_shared/state/permission.state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([
      PermissionState
    ]),
    PermissionsRoutingModule
  ],
  declarations: [
    PermissionsComponent,
    PermissionsViewComponent,
    PermissionDeleteComponent,
    PermissionEditComponent,
    PermissionAddComponent,
    PermissionsTableComponent
  ],
  providers: [PermissionsService]
})
export class PermissionsModule { }
