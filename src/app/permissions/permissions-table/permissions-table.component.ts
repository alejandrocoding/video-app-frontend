import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionType } from '../_shared/enums/permission-type.enum';

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.scss']
})
export class PermissionsTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['select', 'name', 'type', 'updatedAt', 'createdAt'];
  dataSource: MatTableDataSource<Permission>;
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() permissions: Permission[];

  @Output() openEditEvt = new EventEmitter<Permission>();
  @Output() openDeleteEvt = new EventEmitter<Permission>();

  constructor() { }

  ngOnInit() {
    this.updateTableContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.permissions && changes.permissions.currentValue) {
      this.updateTableContent();
    }
  }

  private updateTableContent() {
    this.dataSource = new MatTableDataSource(this.permissions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTypeName(type: PermissionType) {
    switch (type) {
      case PermissionType.FullAccessVideos:
        return 'Full Access Videos';
      case PermissionType.ReadOnlyVideos:
        return 'Read Only Videos';
      case PermissionType.ManageUsers:
        return 'Manage Users';
      case PermissionType.ManageRoles:
        return 'Manage Roles';
      case PermissionType.ManagePermissions:
        return 'Manage Permissions';
    }
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row.id));
  }

  openEdit() {
    const permissionSelected = this.permissions.find(p => p.id === this.selection.selected[0]);
    this.openEditEvt.emit(permissionSelected);
  }

  openDeleteDialog() {
    const permissionSelected = this.permissions.find(p => p.id === this.selection.selected[0]);
    this.openDeleteEvt.emit(permissionSelected);
  }

}
