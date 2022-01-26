import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
