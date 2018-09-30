import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';

import { EditPermission } from '../_shared/actions/permission.actions';
import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionState } from '../_shared/state/permission.state';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission[]>;
  @Select(PermissionState.isLoading) loading$: Observable<boolean>;

  private permissionId: string;
  private permission: Permission;
  private permissions: Permission[];

  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.permissionId = this.route.snapshot.params.id;
    this.permissions$.pipe(skipWhile(permissions => permissions.length === 0), take(1)).subscribe((permissions) => {
      this.permissions = permissions;
      this.permission = this.permissions.find(p => p.id === this.permissionId);
      this.updateNameControl();
      this.updateTypeControl();
      this.setValidators();
    });
  }

  private initForm() {
    this.form = this.fb.group({
      'name': '',
      'type': [{ value: '', disabled: true }, Validators.required]
    });
  }

  private updateNameControl() {
    this.form.controls.name.setValue(this.permission.name);
  }

  private updateTypeControl() {
    this.form.controls.type.setValue(this.permission.type);
  }

  private setValidators() {
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(this.permissions)
    ]);
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  update() {
    const { name } = this.form.value;
    this.store.dispatch(new EditPermission(this.permissionId, { name })).subscribe(() => {
      this.snackBar.open(`Permission '${name}' has been updated`, null, { duration: 5000 });
      this.redirect();
    });
  }
}
