import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { payeeData } from '../providers/payeeData.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  scanSub: any;

  startdate="2020-10-10";
  enddate="2020-11-10";


  // qr scan
  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};

  constructor(
    private router: Router,
    public platform: Platform,
    private qrScanner: QRScanner,
    private payeeData: payeeData
  ) { 
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   document.getElementsByTagName('body')[0].style.opacity = '1';
    //   this.scanSub.unsubscribe();
    // });
  }

 

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {

  }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

  // getParamsFromUPIString(params: string, url: string): string {

  //   let href = url;
  //   let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
  //   let queryString = reg.exec(href);
  //   return queryString ? queryString[1] : null;

  // }

}
