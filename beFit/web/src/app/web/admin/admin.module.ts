import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CreareComponent } from './creare/creare.component';
import { ModificareComponent } from './modificare/modificare.component';


@NgModule({
  declarations: [AdminComponent, CreareComponent, ModificareComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
