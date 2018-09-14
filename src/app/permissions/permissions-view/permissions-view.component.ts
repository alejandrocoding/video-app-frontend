import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Permission } from '../_shared/interfaces/permission.interface';
import { PermissionState } from '../_shared/state/permission.state';

@Component({
  selector: 'app-permissions-view',
  templateUrl: './permissions-view.component.html',
  styleUrls: ['./permissions-view.component.scss']
})
export class PermissionsViewComponent implements OnInit {

  @Select(PermissionState.getAllPermissions) permissions$: Observable<Permission>;

  constructor(private readonly store: Store) { }

  ngOnInit() {
  }

}
