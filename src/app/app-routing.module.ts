import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'videos', loadChildren: 'app/videos/videos.module#VideosModule' },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
  { path: 'roles', loadChildren: 'app/roles/roles.module#RolesModule' },
  { path: 'permissions', loadChildren: 'app/permissions/permissions.module#PermissionsModule' },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
  { path: '', redirectTo: '/videos', pathMatch: 'full' },
  { path: '**', redirectTo: '/videos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
