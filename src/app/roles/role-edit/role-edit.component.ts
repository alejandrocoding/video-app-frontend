import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { skipWhile, take, map } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';
import { EditRoleName, EditRolePermissionsId } from '../_shared/actions/role.actions';
import { Role } from '../_shared/interfaces/role.interface';
import { RoleState } from '../_shared/state/role.state';

import { Permission } from '@app/permissions/_shared/interfaces/permission.interface';
import { PermissionState } from '@app/permissions/_shared/state/permission.state';
import { PermissionType } from '@app/permissions/_shared/enums/permission-type.enum';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission[]>;
  @Select(PermissionState.isLoading) loadingPermissions$: Observable<boolean>;

  @Select(RoleState.getAllRoles) roles$: Observable<Role[]>;
  @Select(RoleState.isLoading) loadingRoles$: Observable<boolean>;

  private roleId: string;
  private role: Role;
  private roles: Role[] = [];

  videoPermissions: Permission[] = [];
  adminPermissions: Permission[] = [];
  selectedAdminPermissionsIds: string[] = [];

  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.roleId = this.route.snapshot.params.id;

    forkJoin(
      this.permissions$.pipe(skipWhile(permissions => permissions.length === 0), take(1)),
      this.roles$.pipe(skipWhile(roles => roles.length === 0), take(1)),
    )
      .pipe(map(result => ({ permissions: result[0], roles: result[1] })), take(1))
      .subscribe(result => {
        this.adminPermissions = this.getAdminPermissions(result.permissions);
        this.videoPermissions = this.getVideoPermissions(result.permissions);
        this.roles = result.roles;
        this.role = this.roles.find(p => p.id === this.roleId);
        this.updateNameControl();
        this.updatePermissionsControl();
        this.setValidators();
      });
  }

  private initForm() {
    this.form = this.fb.group({
      'name': '',
      'videoPermission': ['', Validators.required]
    });
  }

  private updateNameControl() {
    this.form.controls.name.setValue(this.role.name);
  }

  private updatePermissionsControl() {
    const videoPermissionId = this.videoPermissions.find(p => this.role.permissionsId.includes(p.id));
    const adminPermissionsId = this.adminPermissions.filter(p => this.role.permissionsId.includes(p.id));

    this.form.controls.videoPermission.setValue(videoPermissionId.id);
    this.selectedAdminPermissionsIds = adminPermissionsId.map(p => p.id);
  }

  private setValidators() {
    const rolesExclItself = this.roles.filter(r => r.id !== this.roleId);
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(rolesExclItself)
    ]);
  }

  private getVideoPermissions(permissions: Permission[]) {
    return permissions.filter(p => p.type === PermissionType.FullAccessVideos || p.type === PermissionType.ReadOnlyVideos);
  }

  private getAdminPermissions(permissions: Permission[]) {
    return permissions.filter(p => p.type === PermissionType.ManageUsers ||
      p.type === PermissionType.ManageRoles ||
      p.type === PermissionType.ManagePermissions);
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  toggleAdminPermissionId(id: string) {
    this.selectedAdminPermissionsIds.includes(id)
      ? this.selectedAdminPermissionsIds.splice(this.selectedAdminPermissionsIds.findIndex(p => p === id), 1)
      : this.selectedAdminPermissionsIds.push(id);
  }

  update() {
    const name = this.form.controls.name.value;
    const permissionsId = [this.form.controls.videoPermission.value, ...this.selectedAdminPermissionsIds];
    if (name !== this.role.name) {
      this.updateRoleName(this.roleId, name);
    }
    if (permissionsId.length !== this.role.permissionsId.length ||
      !(permissionsId.every(id => this.role.permissionsId.includes(id)))) {
      this.updateRolePermissions(this.roleId, name, permissionsId);
    }
  }

  private updateRoleName(id: string, name: string) {
    this.store.dispatch(new EditRoleName(id, { name })).subscribe(() => {
      this.snackBar.open(`Role name of '${name}' has been updated`, null, { duration: 5000 });
      this.redirect();
    });
  }

  private updateRolePermissions(id: string, name: string, permissionsId: string[]) {
    this.store.dispatch(new EditRolePermissionsId(id, { permissionsId })).subscribe(() => {
      this.snackBar.open(`Role permissions of '${name}' has been updated`, null, { duration: 5000 });
      this.redirect();
    });
  }

}
