import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { paymentdetails } from '../providers/paymentdetails.provider';

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

  paymentdetails: paymentdetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    
    
  }

  ngOnInit() {
  }

}
