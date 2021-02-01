import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { payeeData } from '../app/providers/payeeData.provider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { api } from './providers/api.provider';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { loginStatus } from './providers/loginStatus.provider';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthRouteGuard } from './services/auth/authroute.guard';
import { paymentdetails } from './providers/paymentdetails.provider';
import { DeletePaymentDialog } from './payment-details/payment-details.page';

import { ChartsModule, ThemeService } from 'ng2-charts';



@NgModule({
  declarations: [AppComponent, DeletePaymentDialog],
  entryComponents: [DeletePaymentDialog],
  imports: [
    BrowserModule, 
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    IonicModule.forRoot(),
    AppRoutingModule, BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    payeeData,
    BarcodeScanner,
    NativeStorage,
    HTTP,
    api,
    paymentdetails,
    loginStatus,
    AuthGuard,
    AuthRouteGuard,
    ThemeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
