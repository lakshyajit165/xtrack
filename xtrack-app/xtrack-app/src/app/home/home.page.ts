import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { payeeData } from '../providers/payeeData.provider';
import { AuthService } from '../services/auth/auth.service';
import { PaymentService } from '../services/payment/payment.service';

import { IPaymentResponse } from '../model/IPaymentResponse';

import {MatTableDataSource} from '@angular/material/table';
import { paymentdetails } from '../providers/paymentdetails.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  fromdate: string = "";
  todate: string = "";

  isLinear = false;


  constructor(
    private router: Router,
    public platform: Platform,
    private authService: AuthService,
    private paymentService: PaymentService,
    private paymentdetails: paymentdetails
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

    console.log("HOME COMPONENT constructor!");



   
    
  }

 

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {
   console.log("home page ngoninit!");

   // ngOnInit - Initialize your component and load data from services that don't need refreshing on each subsequent visit.
    
    
  }

  
  ionViewDidEnter(): void {
    
    this.todate = new Date().toISOString().split("T")[0];
    // set start date to 1 month prior to today's date
    
    
    let d = new Date();
    this.fromdate= d.toISOString();

    d.setMonth(d.getMonth() - 1);

    this.fromdate = d.toISOString().split("T")[0];

    this.paymentService.getCategoryWiseTotal(this.fromdate, this.todate)
    .then(res => {
      console.log("CATEGORY_WISE DATA");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
     
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
