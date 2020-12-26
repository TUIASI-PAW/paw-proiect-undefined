import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { ActualizareComponent } from './actualizare/actualizare.component';
import { AlimentareComponent } from './alimentare/alimentare.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog'
import { ConfirmationDialogService } from '../shared/components/dialog/dialog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ProfilComponent,
    ActualizareComponent,
    AlimentareComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers:[
    ConfirmationDialogService,
  ]
})
export class ProfilModule { }
