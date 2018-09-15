import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionState } from '../_shared/state/permission.state';
import { DeletePermission } from '../_shared/actions/permission.actions';
import { Util } from '@shared/util';

import { PermissionDeleteComponent } from '../permission-delete/permission-delete.component';
import { PermissionsTableComponent } from '../permissions-table/permissions-table.component';

@Component({
  selector: 'app-permissions-view',
  templateUrl: './permissions-view.component.html',
  styleUrls: ['./permissions-view.component.scss']
})
export class PermissionsViewComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission>;
  @ViewChild(PermissionsTableComponent) table: PermissionsTableComponent;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog) { }

  ngOnInit() { }

  goToAdd() {
    console.log('add'); // TODO: To implement
  }

  goToEdit(permission: Permission) {
    console.log('edit', permission); // TODO: To implement
  }

  openDelete(permission: Permission) {
    const dialogRef = this.dialog.open<PermissionDeleteComponent, Permission, Permission>
      (PermissionDeleteComponent, { ...Util.getDialogConfig(), data: permission });
    dialogRef.afterClosed().pipe(filter(p => !!p)).subscribe(() => this.deletePermission(permission));
  }

  private deletePermission(permission: Permission) {
    this.table.selection.clear();
    this.store.dispatch(new DeletePermission(permission.id));
    this.snackBar.open(`Permission '${permission.name}' has been deleted`, null, { duration: 5000 });
  }

}
