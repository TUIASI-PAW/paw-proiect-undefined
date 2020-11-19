import { ActualizareComponent } from './actualizare/actualizare.component';
import { ProfilComponent } from './profil/profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlimentareComponent } from './alimentare/alimentare.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfilComponent
  },
  {
    path: 'actualizare',
    pathMatch: 'full',
    component: ActualizareComponent
  },
  {
    path: 'alimentare',
    pathMatch: 'full',
    component: AlimentareComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
