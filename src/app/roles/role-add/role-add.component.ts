import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Store } from '@ngxs/store';
import { skipWhile, take } from 'rxjs/internal/operators';

import { nameValidator } from '@validators/name.validator';
import { uniqueNameValidator } from '@validators/unique-name.validator';
import { AddRole } from '../_shared/actions/role.actions';
import { Role } from '../_shared/interfaces/role.interface';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  private roles: Role[];

  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.roles = await this.getRoles();
    this.setValidators();
  }

  private initForm() {
    this.form = this.fb.group({
      'name': ['']
    });
  }

  private setValidators() {
    this.form.controls.name.setValidators([
      Validators.required, nameValidator, uniqueNameValidator(this.roles)
    ]);
  }

  private async getRoles() {
    return await this.store.select(state => state.roles.roles).pipe<Role[], Role[]>(
      skipWhile(roles => roles.length <= 0),
      take(1)
    ).toPromise();
  }

  private redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save() {
    const name = this.form.controls.name.value;
    this.store.dispatch(new AddRole({ name, permissionsId: [], createdBy: null })).subscribe(() => {
      this.snackBar.open(`Role '${name}' has been added`, null, { duration: 5000 });
      this.redirect();
    });
  }

}
