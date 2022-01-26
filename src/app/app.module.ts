import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    BarcodeScanner,
    Deploy
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
