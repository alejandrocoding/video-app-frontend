import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../_shared/interfaces/role.interface';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.scss']
})
export class RoleDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Role) { }
}
