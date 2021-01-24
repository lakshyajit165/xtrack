import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { IPaymentResponse } from '../model/IPaymentResponse';
import { AuthService } from '../services/auth/auth.service';
import { PaymentService } from '../services/payment/payment.service';
import { paymentdetails } from '../providers/paymentdetails.provider';


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

  paymentFetchError: boolean = false;
  paymentdetailsloading: boolean = false;

  myPayments: IPaymentResponse[] = [];

  
  constructor(
    private router: Router,
    public platform: Platform,
    private authService: AuthService,
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

    console.log("STARTDATE:", this.startdate, this.enddate);

   // console.log(this.getStartDateMonth(this.enddate));
  
      this.getPaymentDetails();
  }
  
  getPaymentDetails(): void {
    this.paymentdetailsloading = true;

    this.paymentService.getMyPayments(this.currentPage, this.currentSize)
     .then(res => {
       console.log(res);
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

  startDateChanged(event): void {
    console.log(this.startdate);
  }

  endDateChanged(event): void {
    console.log(event);
    console.log(this.enddate);
  }

}
