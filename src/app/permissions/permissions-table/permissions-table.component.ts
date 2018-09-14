import { Component, OnInit, Input } from '@angular/core';

import { Permission } from '../_shared/interfaces/permission.interface';

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.scss']
})
export class PermissionsTableComponent implements OnInit {

  @Input() permissions: Permission[];

  constructor() { }

  ngOnInit() {
  }

}
