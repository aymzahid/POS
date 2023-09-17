import { GlobalVariable } from 'src/global';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxPrintModule,

  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalVariable,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
