import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { ActualizareComponent } from './actualizare/actualizare.component';
import { AlimentareComponent } from './alimentare/alimentare.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ProfilComponent, ActualizareComponent, AlimentareComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ProfilModule {}
