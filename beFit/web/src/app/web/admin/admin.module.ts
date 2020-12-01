import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CreareComponent } from './creare/creare.component';
import { ModificareComponent } from './modificare/modificare.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import {MatDialogModule} from '@angular/material/dialog'
import { ConfirmationDialogService } from '../shared/components/dialog/dialog.service';

@NgModule({
  declarations: [AdminComponent, CreareComponent, ModificareComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers:[
    ConfirmationDialogService
  ]
})
export class AdminModule { }
