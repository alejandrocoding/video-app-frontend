import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Role } from '../_shared/interfaces/role.interface';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['select', 'name', 'permissions', 'updatedAt', 'createdAt'];
  dataSource: MatTableDataSource<Role>;
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() roles: Role[];

  @Output() openEditEvt = new EventEmitter<Role>();
  @Output() openDeleteEvt = new EventEmitter<Role>();

  constructor() { }

  ngOnInit() {
    this.updateTableContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.roles && changes.roles.currentValue) {
      this.updateTableContent();
    }
  }

  private updateTableContent() {
    this.dataSource = new MatTableDataSource(this.roles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    const permissionSelected = this.roles.find(p => p.id === this.selection.selected[0]);
    this.openEditEvt.emit(permissionSelected);
  }

  openDeleteDialog() {
    const permissionSelected = this.roles.find(p => p.id === this.selection.selected[0]);
    this.openDeleteEvt.emit(permissionSelected);
  }

}
