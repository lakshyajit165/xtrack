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
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName('body')[0].style.opacity = '1';
      this.scanSub.unsubscribe();
    });
  }

  scan() {
    // Optionally request the permission early
    this.qrScanner.prepare().
      then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSub = document.getElementsByTagName('body')[0].style.opacity = '0';
          // debugger
          this.scanSub = this.qrScanner.scan()
            .subscribe((textFound: string) => {
              document.getElementsByTagName('body')[0].style.opacity = '1';
              this.qrScanner.hide();
              this.scanSub.unsubscribe();

              this.scannedData = textFound;
              console.log(textFound);

              // sample scanned text
             // upi://pay?pa=8895844786@ybl&pn=LAKSHYAJIT%20LAXMIKANT&mc=0000&mode=02&purpose=00
              const payee = this.getParamsFromUPIString('pa', textFound);

              // set payee data to provider
              this.payeeData.payeedata = payee;

              // route to add payment page
              this.routeFunction('/xtrack/menu/add-expense');
              // console.log(payee);
              // scan success => extract data => add data to provider => route to Add expense page
              
            }, (err) => {
              alert(JSON.stringify(err));
            });

        } else if (status.denied) {
        } else {

        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {

  }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

  getParamsFromUPIString(params: string, url: string): string {

    let href = url;
    let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
    let queryString = reg.exec(href);
    return queryString ? queryString[1] : null;

  }

}
