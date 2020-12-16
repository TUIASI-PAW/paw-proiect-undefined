import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './web/shared/layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './web/shared/layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './web/shared/layout/admin-layout/admin-layout.component';
import { AuthGuard } from './helpers/AuthGuard';
import { UserRoles } from './services/models/user/user.roles';

// localhost:4200/
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: AppLayoutComponent,
    loadChildren: () => import('./web/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ROLE_UNAUTHORIZED]}
  },
  {
    path: 'inregistrare',
    component: AuthLayoutComponent,
    loadChildren: () => import('./web/autorizare/inregistrare/inregistrare.module').then((m) => m.InregistrareModule)
  },
  {
    path: 'autentificare',
    component: AuthLayoutComponent,
    loadChildren: () => import('./web/autorizare/autentificare/autentificare.module').then((m) => m.AutentificareModule)
  },
  {
    path: 'abonamente',
    component: AppLayoutComponent,
    loadChildren: () => import('./web/abonamente/abonamente.module').then((m) => m.AbonamenteModule),
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ROLE_UNAUTHORIZED]}
  },
  {
    path: 'profil',
    component: AppLayoutComponent,
    loadChildren: () => import('./web/profil/profil.module').then((m) => m.ProfilModule),
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ROLE_CLIENT]}
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./web/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ROLE_ADMIN]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
