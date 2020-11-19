import { InregistrareComponent } from './inregistrare/inregistrare.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// localhost:4200/inregistrare/
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InregistrareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InregistrareRoutingModule { }
