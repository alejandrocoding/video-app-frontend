import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Permission } from '@app/permissions/_shared/interfaces/permission.interface';

@Component({
  selector: 'app-permission-delete',
  templateUrl: './permission-delete.component.html',
  styleUrls: ['./permission-delete.component.scss']
})
export class PermissionDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Permission) { }
}
