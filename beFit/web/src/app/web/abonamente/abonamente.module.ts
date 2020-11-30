import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonamenteRoutingModule } from './abonamente-routing.module';
import { AbonamenteComponent } from './abonamente/abonamente.component';
import { DetaliiComponent } from './detalii/detalii.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AbonamenteComponent, DetaliiComponent],
  imports: [
    CommonModule,
    AbonamenteRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class AbonamenteModule { }
