import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InregistrareRoutingModule } from './inregistrare-routing.module';
import { InregistrareComponent } from './inregistrare/inregistrare.component';


@NgModule({
  declarations: [InregistrareComponent],
  imports: [
    CommonModule,
    InregistrareRoutingModule
  ]
})
export class InregistrareModule { }
