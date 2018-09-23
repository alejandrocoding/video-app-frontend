import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

import { Util } from '@shared/util';
import { Role } from '../_shared/interfaces/role.interface';
import { RoleState } from '../_shared/state/role.state';
import { DeleteRole } from '../_shared/actions/role.actions';

import { RoleDeleteComponent } from '../role-delete/role-delete.component';
import { RolesTableComponent } from '../roles-table/roles-table.component';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.scss']
})
export class RolesViewComponent implements OnInit {

  @Select(RoleState.getAllRoles) roles$: Observable<Role[]>;
  @Select(RoleState.isLoading) loading$: Observable<boolean>;
  @ViewChild(RolesTableComponent) table: RolesTableComponent;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog) { }

  ngOnInit() { }

  goToAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  goToEdit(role: Role) {
    this.router.navigate([`edit/${role.id}`], { relativeTo: this.route });
  }

  openDelete(role: Role) {
    const dialogRef = this.dialog.open<RoleDeleteComponent, Role, Role>
      (RoleDeleteComponent, { ...Util.getDialogConfig(), data: role });
    dialogRef.afterClosed().pipe(filter(p => !!p)).subscribe(() => this.deleteRole(role));
  }

  private deleteRole(role: Role) {
    this.table.selection.clear();
    this.store.dispatch(new DeleteRole(role.id))
      .subscribe(() => {
        this.snackBar.open(`Role '${role.name}' has been deleted`, null, { duration: 5000 });
      });
  }

}
