import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

import { Util } from '@shared/util';
import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionState } from '../_shared/state/permission.state';
import { DeletePermission } from '../_shared/actions/permission.actions';

import { PermissionDeleteComponent } from '../permission-delete/permission-delete.component';
import { PermissionsTableComponent } from '../permissions-table/permissions-table.component';

@Component({
  selector: 'app-permissions-view',
  templateUrl: './permissions-view.component.html',
  styleUrls: ['./permissions-view.component.scss']
})
export class PermissionsViewComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission[]>;
  @Select(PermissionState.isLoading) loading$: Observable<boolean>;

  @ViewChild(PermissionsTableComponent) table: PermissionsTableComponent;

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

  goToEdit(permission: Permission) {
    this.router.navigate([`edit/${permission.id}`], { relativeTo: this.route });
  }

  openDelete(permission: Permission) {
    const dialogRef = this.dialog.open<PermissionDeleteComponent, Permission, Permission>
      (PermissionDeleteComponent, { ...Util.getDialogConfig(), data: permission });
    dialogRef.afterClosed().pipe(filter(p => !!p)).subscribe(() => this.deletePermission(permission));
  }

  private deletePermission(permission: Permission) {
    this.table.selection.clear();
    this.store.dispatch(new DeletePermission(permission.id)).subscribe(() => {
      this.snackBar.open(`Permission '${permission.name}' has been deleted`, null, { duration: 5000 });
    });
  }

}
