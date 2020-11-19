import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificareRoutingModule } from './autentificare-routing.module';
import { AutentificareComponent } from './autentificare/autentificare.component';


@NgModule({
  declarations: [AutentificareComponent],
  imports: [
    CommonModule,
    AutentificareRoutingModule
  ]
})
export class AutentificareModule { }
