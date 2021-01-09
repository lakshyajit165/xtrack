import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { payeeData } from '../providers/payeeData.provider';
import { AuthService } from '../services/auth/auth.service';
import { PaymentService } from '../services/payment/payment.service';

import { IPaymentResponse } from '../model/IPaymentResponse';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  startdate="2020-10-10";
  enddate="2020-11-10";

  currentPage: number = 0;
  currentSize: number = 5;

  paymentFetchError: boolean = false;

  myPayments: IPaymentResponse[] = [];

  displayedColumns: string[] = ['amount', 'category', 'createdAt', 'details'];
  dataSource = new MatTableDataSource<IPaymentResponse>(this.myPayments);

  constructor(
    private router: Router,
    public platform: Platform,

    private payeeData: payeeData,
    private authService: AuthService,
    private paymentService: PaymentService
  ) { 
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   document.getElementsByTagName('body')[0].style.opacity = '1';
    //   this.scanSub.unsubscribe();
    // });
    // this.authService.isLoggedIn().then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    this.paymentService.getMyPayments(this.currentPage, this.currentSize)
    .then(res => {
      console.log(res);
      this.myPayments = res['content'];
      this.dataSource = new MatTableDataSource<IPaymentResponse>(this.myPayments);
      console.log(this.myPayments);
    })
    .catch(err => {

      this.paymentFetchError = true;
    })
    
  }

 

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {
   
  }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

  paymentDetails(id: number){
    console.log(id);
  }

  // getParamsFromUPIString(params: string, url: string): string {

  //   let href = url;
  //   let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
  //   let queryString = reg.exec(href);
  //   return queryString ? queryString[1] : null;

  // }

}
