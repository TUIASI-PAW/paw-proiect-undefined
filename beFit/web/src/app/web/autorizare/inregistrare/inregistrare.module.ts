import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InregistrareRoutingModule } from './inregistrare-routing.module';
import { InregistrareComponent } from './inregistrare/inregistrare.component';

import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [InregistrareComponent],
  imports: [
    CommonModule,
    InregistrareRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class InregistrareModule { }
