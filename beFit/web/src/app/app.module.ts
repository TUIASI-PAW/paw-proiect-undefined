import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppLayoutComponent } from './web/shared/layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './web/shared/layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './web/shared/layout/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/JwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
