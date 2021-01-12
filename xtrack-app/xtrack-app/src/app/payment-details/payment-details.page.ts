import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaymentResponse } from '../model/IPaymentResponse';
import { paymentdetails } from '../providers/paymentdetails.provider';
import { PaymentService } from '../services/payment/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  id: number;
  amount: number = 0;
  category: string = '';
  createdAt: string = '';
  description: string = '';
  payee: string = '';
  payer: string = '';
  updatedAt: string = '';

  paymentFetchError: boolean = false;
  paymentDetailsLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paymentdetails: paymentdetails,
    private paymentService: PaymentService
  ) { 
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    
   
    
  }

  ngOnInit() {

    // check if provider is undefined, fetch from service
    if(this.paymentdetails.payment === undefined) {

      this.paymentDetailsLoading = true;

      this.paymentService.getPaymentById(this.id)
      .then(res => {
        
        this.id = res['id'];
        this.amount = res['amount'];
        this.category = res['category'];
        this.createdAt = res['createdAt'];
        this.description = res['description'];
        this.payee = res['payee'];
        this.payer = res['payer'];
        this.updatedAt = res['updatedAt'];

        this.paymentDetailsLoading = false;

      })
      .catch(err => {
        
        this.paymentFetchError = true;
        // display fetch error as a message
        this.paymentDetailsLoading = false;

      })
    } else {

      this.paymentDetailsLoading = false;
      
      // get data from provider
      this.setPaymentDetailsToFields(this.paymentdetails.payment);

    }
    
  }

  setPaymentDetailsToFields(paymentdetails: IPaymentResponse) {

    this.id = paymentdetails.id;
    this.amount = paymentdetails.amount;
    this.category = paymentdetails.category;
    this.createdAt = paymentdetails.createdAt;
    this.description = paymentdetails.description;
    this.payee = paymentdetails.payee;
    this.payer = paymentdetails.payer;
    this.updatedAt = paymentdetails.updatedAt;
  

  }

}
