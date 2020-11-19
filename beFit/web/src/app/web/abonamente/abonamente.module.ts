import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonamenteRoutingModule } from './abonamente-routing.module';
import { AbonamenteComponent } from './abonamente/abonamente.component';
import { DetaliiComponent } from './detalii/detalii.component';


@NgModule({
  declarations: [AbonamenteComponent, DetaliiComponent],
  imports: [
    CommonModule,
    AbonamenteRoutingModule
  ]
})
export class AbonamenteModule { }
