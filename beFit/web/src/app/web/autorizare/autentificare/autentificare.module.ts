import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificareRoutingModule } from './autentificare-routing.module';
import { AutentificareComponent } from './autentificare/autentificare.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [AutentificareComponent],
  imports: [
    CommonModule,
    AutentificareRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})
export class AutentificareModule { }
