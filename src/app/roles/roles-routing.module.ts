import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesComponent } from './roles.component';
import { RolesViewComponent } from './roles-view/roles-view.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

import { RolesResolver } from './shared/resolvers/roles.resolver';

const routes: Routes = [
  {
    path: '', component: RolesComponent, children:
      [
        { path: '', component: RolesViewComponent },
        { path: 'add', component: RoleAddComponent },
        { path: 'edit/:id', component: RoleEditComponent, resolve: RolesResolver },
        { path: '**', redirectTo: '/roles' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
