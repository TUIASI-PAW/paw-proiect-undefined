import { AbonamenteComponent } from './abonamente/abonamente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetaliiComponent } from './detalii/detalii.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AbonamenteComponent
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
export class AbonamenteRoutingModule { }
