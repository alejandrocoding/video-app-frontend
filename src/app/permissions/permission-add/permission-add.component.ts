import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';

import { AddPermission } from '../_shared/actions/permission.actions';
import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionState } from '../_shared/state/permission.state';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission[]>;
  @Select(PermissionState.isLoading) loading$: Observable<boolean>;

  private permissions: Permission[];

  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.permissions$.pipe(skipWhile(permissions => permissions.length === 0), take(1)).subscribe((permissions) => {
      this.permissions = permissions;
      this.setValidators();
    });
  }

  private initForm() {
    this.form = this.fb.group({
      'name': '',
      'type': ['', Validators.required]
    });
  }

  private setValidators() {
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(this.permissions)
    ]);
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save() {
    const { name, type } = this.form.value;
    this.store.dispatch(new AddPermission({ name, type })).subscribe(() => {
      this.snackBar.open(`Permission '${name}' has been added`, null, { duration: 5000 });
      this.redirect();
    });
  }
}
