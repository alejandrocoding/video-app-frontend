import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store } from '@ngxs/store';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';
import { AddPermission } from '../_shared/actions/permission.actions';
import { Permission } from '../_shared/interfaces/permission.interface';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {

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
    this.permissions = await this.getPermissions();
    this.setValidators();
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

  save() {
    const { name, type } = this.form.value;
    this.store.dispatch(new AddPermission({ name, type })).subscribe(() => {
      this.snackBar.open(`Permission '${name}' has been added`, null, { duration: 5000 });
      this.redirect();
    });
  }
}
