import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsComponent } from './permissions.component';
import { PermissionsViewComponent } from './permissions-view/permissions-view.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';

const routes: Routes = [
  {
    path: '', component: PermissionsComponent, children:
      [
        { path: '', component: PermissionsViewComponent },
        { path: 'add', component: PermissionAddComponent },
        { path: 'edit/:id', component: PermissionEditComponent },
        { path: '**', redirectTo: '/permissions' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
