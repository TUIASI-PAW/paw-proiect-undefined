import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonamenteRoutingModule } from './abonamente-routing.module';
import { AbonamenteComponent } from './abonamente/abonamente.component';
import { DetaliiComponent } from './detalii/detalii.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog'

import { ConfirmationDialogService } from '../shared/components/dialog/dialog.service';

@NgModule({
  declarations: [AbonamenteComponent, DetaliiComponent],
  imports: [
    CommonModule,
    AbonamenteRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers:[ConfirmationDialogService],
})
export class AbonamenteModule { }
