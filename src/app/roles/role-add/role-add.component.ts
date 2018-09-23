import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';
import { AddRole } from '../_shared/actions/role.actions';
import { Role } from '../_shared/interfaces/role.interface';
import { RoleState } from '../_shared/state/role.state';

import { Permission } from '@app/permissions/_shared/interfaces/permission.interface';
import { PermissionState } from '@app/permissions/_shared/state/permission.state';
import { PermissionType } from '@app/permissions/_shared/enums/permission-type.enum';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission[]>;
  @Select(RoleState.getAllRoles) roles$: Observable<Role[]>;

  private roles: Role[] = [];

  videoPermissions: Permission[] = [];
  adminPermissions: Permission[] = [];
  private selectedAdminPermissionsIds: string[] = [];

  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.setPermissions();
    this.roles = await this.getRoles();
    this.setValidators();
  }

  private initForm() {
    this.form = this.fb.group({
      'name': '',
      'video-permission': ['', Validators.required]
    });
  }

  private setValidators() {
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(this.roles)
    ]);
  }

  private getRoles() {
    return this.store.select(state => state.roles.roles).pipe<Role[]>(take((this.roles.length === 0) ? 1 : 0)).toPromise();
  }

  private setPermissions() {
    // forkJoin(
    //   this.permissions$.pipe(skipWhile(permissions => permissions.length === 0), take(1)),
    //   this.roles$.pipe(skipWhile(roles => roles.length === 0), take(1))
    // ).subscribe(result => {
    //   console.log(result[0]);
    //   console.log(result[1]);
    // });
    // TODO:
    // Tengo que terminar de revisar el codigo de roles y permissions
    // 1) Revisar como funcionan los getRoles, getPermissiones y esas llamadas que esperan del otro
    // 2) Buscar forma segura y limpia, sobre todo, ver diferencias entre refresh y redirect al componente
    // 3) Revisar los pipes, switchMaps, y demás operadores usados

    this.permissions$.pipe(skipWhile(permissions => permissions.length === 0), take(1)).subscribe(permissions => {
      this.videoPermissions = permissions.filter(p =>
        p.type === PermissionType.FullAccessVideos ||
        p.type === PermissionType.ReadOnlyVideos);
      this.adminPermissions = permissions.filter(p =>
        p.type === PermissionType.ManageUsers ||
        p.type === PermissionType.ManageRoles ||
        p.type === PermissionType.ManagePermissions);
    });
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  toggleAdminPermissionId(id: string) {
    this.selectedAdminPermissionsIds.includes(id)
      ? this.selectedAdminPermissionsIds.splice(this.selectedAdminPermissionsIds.findIndex(p => p === id), 1)
      : this.selectedAdminPermissionsIds.push(id);
  }

  save() {
    const name = this.form.controls.name.value;
    const permissionsId = [this.form.controls['video-permission'].value, ...this.selectedAdminPermissionsIds];
    this.store.dispatch(new AddRole({ name, permissionsId, createdBy: null })).subscribe(() => {
      this.snackBar.open(`Role '${name}' has been added`, null, { duration: 5000 });
      this.redirect();
    });
  }

}
