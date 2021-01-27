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


  startdate="2020-10-10";
  enddate="2020-11-10";

  currentPage: number = 0;
  currentSize: number = 5;

  paymentFetchError: boolean = false;
  paymentdetailsloading: boolean = false;

  myPayments: IPaymentResponse[] = [];


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
    
    this.getPaymentDetails();
  }

  
  ionViewDidEnter(): void {
    
    // check if ngOninitalready called, no need to call again
  
      this.getPaymentDetails();
  }

  routeFunction(path: string): void {
    
    this.router.navigate([path]);
  }

  getPaymentDetails(): void {
    this.paymentdetailsloading = true;

    this.paymentService.getMyPayments(this.currentPage, this.currentSize)
     .then(res => {
       console.log("GETTING DATA FROM service inside home component: "+ res);
       this.myPayments = res['content'];
      
       console.log(this.myPayments);
       this.paymentdetailsloading = false;
     })
 
     .catch(err => {
 
       this.paymentdetailsloading = false;
       this.paymentFetchError = true;
     })
  }

  gotoPaymentDetails(id: number){

    this.setPaymentDetailsInProvider(id);
    
    this.routeFunction('/xtrack/menu/payment-details/'+id);
  }

  setPaymentDetailsInProvider(id: number) {
   
    let payment = this.myPayments.filter(ele => ele.id === id);

    this.paymentdetails.payment.id = payment[0].id;
    this.paymentdetails.payment.amount = payment[0].amount;
    this.paymentdetails.payment.category = payment[0].category;
    this.paymentdetails.payment.description = payment[0].description;
    this.paymentdetails.payment.payee = payment[0].payee;
    this.paymentdetails.payment.payer = payment[0].payer;
    this.paymentdetails.payment.createdAt = payment[0].createdAt;
    this.paymentdetails.payment.updatedAt = payment[0].updatedAt;
    
  }


  // getParamsFromUPIString(params: string, url: string): string {

  //   let href = url;
  //   let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
  //   let queryString = reg.exec(href);
  //   return queryString ? queryString[1] : null;

  // }

}
