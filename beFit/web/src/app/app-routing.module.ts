import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// localhost:4200/
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./web/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'inregistrare',
    loadChildren: () => import('./web/autorizare/inregistrare/inregistrare.module').then((m) => m.InregistrareModule)
  },
  {
    path: 'autentificare',
    loadChildren: () => import('./web/autorizare/autentificare/autentificare.module').then((m) => m.AutentificareModule)
  },
  {
    path: 'abonamente',
    loadChildren: () => import('./web/abonamente/abonamente.module').then((m) => m.AbonamenteModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./web/profil/profil.module').then((m) => m.ProfilModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./web/admin/admin.module').then((m) => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
