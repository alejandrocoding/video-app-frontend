import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store } from '@ngxs/store';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';
import { EditPermission } from '../_shared/actions/permission.actions';
import { Permission } from '../_shared/interfaces/permission.interface';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {

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

  async ngOnInit() {
    this.initForm();
    this.permissionId = this.route.snapshot.params.id;
    this.permissions = await this.getPermissions();
    this.permission = this.permissions.find(p => p.id === this.permissionId);
    this.updateNameControl();
    this.setValidators();
  }

  private initForm() {
    this.form = this.fb.group({
      'name': ['']
    });
  }

  private updateNameControl() {
    this.form.controls.name.setValue(this.permission.name);
  }

  private setValidators() {
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(this.permissions)
    ]);
  }

  private async getPermissions() {
    // FIXME: I need to investigate how to use selectOnce emitting just the full array
    return await this.store.select(state => state.permissions.permissions).pipe<Permission[], Permission[]>(
      skipWhile(permissions => permissions.length <= 0),
      take(1)
    ).toPromise();
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  update() {
    const name = this.form.controls.name.value;
    this.store.dispatch(new EditPermission(this.permissionId, { name })).subscribe(() => {
      this.snackBar.open(`Permission '${name}' has been updated`, null, { duration: 5000 });
      this.redirect();
    });
  }
}
