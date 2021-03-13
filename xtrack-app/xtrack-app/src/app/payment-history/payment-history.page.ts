import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanValueAccessor, Platform } from '@ionic/angular';
import { IPaymentResponse } from '../model/IPaymentResponse';
import { AuthService } from '../services/auth/auth.service';
import { PaymentService } from '../services/payment/payment.service';
import { paymentdetails } from '../providers/paymentdetails.provider';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {

  startdate: string = "";
  enddate: string = "";

  maxdate: string = "";

  currentPage: number = 0;
  currentSize: number = 5;
  lastPage: boolean;

  paymentFetchError: boolean = false;
  paymentdetailsloading: boolean = false;

  myPayments: IPaymentResponse[] = [];

  paymentsListEmpty: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  
  constructor(
    private router: Router,
    public platform: Platform,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private paymentdetails: paymentdetails
  ) { }

  ngOnInit() {
  }

  routeFunction(path: string): void {
    
    this.router.navigate([path]);
  }

  ionViewDidEnter(): void {
    
    // set maxdate value (to be used as max values for both from and to dates)
    this.maxdate = new Date().toISOString().split("T")[0];
    // set start date to 1 month prior to today's date
    
    
    let d = new Date();
    this.enddate = d.toISOString();

    d.setMonth(d.getMonth() - 1);

    this.startdate = d.toISOString();
    // check if ngOninitalready called, no need to call again

    // console.log("STARTDATE:", this.startdate, this.enddate);

   // console.log(this.getStartDateMonth(this.enddate));
  
      this.getPaymentDetails();
  }
  
  getPaymentDetails(): void {
    
    
   
    let from = this.startdate.split("T").reverse()[1];
    let to = this.enddate.split("T").reverse()[1];

    if(this.verifyDateRange(from, to)) {

      this.paymentdetailsloading = true;


      this.paymentService.getMyPaymentsByDate(from, to, this.currentPage, this.currentSize)
      .then(res => {
       //  console.log(res);
        this.myPayments = res['content'];
 
        this.paymentsListEmpty = this.myPayments.length === 0 ? true : false;
 
        this.currentPage = res['page'];
 
        this.lastPage = res['last'];
        
       //  console.log(this.myPayments);
        this.paymentdetailsloading = false;
      })
  
      .catch(err => {
  
        this.paymentdetailsloading = false;
        this.paymentFetchError = true;
      })

    } else {

      this.openSnackBar('Invalid date range!');

    }

   
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

  startDateChanged(event): void {
    // console.log(this.startdate);
    this.getPaymentDetails();
  }

  endDateChanged(event): void {
    // console.log(event);
    // console.log(this.enddate);

    this.getPaymentDetails();
  }

  verifyDateRange(from: string, to: string): boolean {
    return Date.parse(from) < Date.parse(to);
  }

  nextPage(): void {
    this.currentPage += 1;
    this.getPaymentDetails();
  }

  previousPage(): void {
    this.currentPage -= 1;
    this.getPaymentDetails();
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
