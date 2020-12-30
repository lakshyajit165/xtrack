import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';
import { payeeData } from '../providers/payeeData.provider';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  scanSub: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private router: Router,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private payeeData: payeeData,
    private _snackBar: MatSnackBar,
  ) {
    this.platform.backButton.subscribeWithPriority(999, (processNextHandler) => {
     

      // route to home page / add expense page based on data availability
      if(this.payeeData.payeedata !== undefined)
        // route to add payment page
        this.routeFunction('/xtrack/menu/add-expense');
      else
        // route to home page
        this.routeFunction('/xtrack/menu/home');

      processNextHandler();
    });
    this.scan();
   }

  ngOnInit() {
  }

   // qr scan
   encodedData = '';
   QRSCANNED_DATA: string;
   isOn = false;
   scannedData: {};

   scan() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE',
      orientation: 'portrait',
    };
    
    this.barcodeScanner.scan(options).then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedData = barcodeData;
      
        if(barcodeData.cancelled){

          this.openSnackBar('Scan Failed!');
          this.routeFunction('/qrscan');

        } else {

          // sample scanned text
          // upi://pay?pa=8895844786@ybl&pn=LAKSHYAJIT%20LAXMIKANT&mc=0000&mode=02&purpose=00
          const payee = this.getParamsFromUPIString('pa', barcodeData.text);

          // set payee data to provider
          this.payeeData.payeedata = payee;

          // route to add payment page
          this.routeFunction('/xtrack/menu/add-expense');

        }
          
       

    }).catch(err => {
      this.openSnackBar('Scan Failed!');
      this.routeFunction('/qrscan');
      console.log('Error', err);
    });
  }
    // Optionally request the permission early
  //   this.qrScanner.prepare().
  //     then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         this.qrScanner.show();
  //         this.scanSub = document.getElementsByTagName('body')[0].style.opacity = '0';
  //         // debugger
  //         this.scanSub = this.qrScanner.scan()
  //           .subscribe((textFound: string) => {
  //             document.getElementsByTagName('body')[0].style.opacity = '1';
  //             this.qrScanner.hide();
  //             this.scanSub.unsubscribe();

  //             this.scannedData = textFound;
  //             console.log(textFound);

  //             // sample scanned text
  //            // upi://pay?pa=8895844786@ybl&pn=LAKSHYAJIT%20LAXMIKANT&mc=0000&mode=02&purpose=00
  //             const payee = this.getParamsFromUPIString('pa', textFound);

  //             // set payee data to provider
  //             this.payeeData.payeedata = payee;

  //             // route to add payment page
  //             this.routeFunction('/xtrack/menu/add-expense');
  //             // console.log(payee);
  //             // scan success => extract data => add data to provider => route to Add expense page
              
  //           }, (err) => {
  //             alert(JSON.stringify(err));
  //           });

  //       } else if (status.denied) {

  //         // close scanner here
  //         this.closeScanner();

  //       } else {

  //         // close scanner here
  //         this.closeScanner();

  //       }
  //     })
  //     .catch((e: any) => {
  //       console.log('Error is', e);
  //       this.closeScanner();
  //     });
  // }

  // closeScanner() {
  //   this.isOn = false;
  //   this.qrScanner.hide();
  //   this.qrScanner.destroy();
  // }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

  getParamsFromUPIString(params: string, url: string): string {

    let href = url;
    let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
    let queryString = reg.exec(href);
    return queryString ? queryString[1] : null;

  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar'
    });
  }
  

}
