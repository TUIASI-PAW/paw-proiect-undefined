import { ModificareComponent } from './modificare/modificare.component';
import { CreareComponent } from './creare/creare.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetaliiComponent } from './detalii/detalii.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent
  },
  {
    path: 'creare_abonament',
    pathMatch: 'full',
    component: CreareComponent
  },
  {
    path: 'modificare_abonament/:id',
    pathMatch: 'full',
    component: ModificareComponent
  },
  {
    path: 'detalii_abonament/:id',
    pathMatch: 'full',
    component: DetaliiComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
