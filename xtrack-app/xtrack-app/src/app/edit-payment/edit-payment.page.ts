import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayment } from '../model/IPayment';
import { IPaymentResponse } from '../model/IPaymentResponse';
import { paymentdetails } from '../providers/paymentdetails.provider';
import { PaymentService } from '../services/payment/payment.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.page.html',
  styleUrls: ['./edit-payment.page.scss'],
})
export class EditPaymentPage implements OnInit {

  id: number;
  amount: number;
  category: string;
  payee: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  payer: string;

  payment: IPayment = {
    amount: '',
    payee: '',
    description: '',
    category: ''
  };
  
  categorylist = ['FOOD', 'RECHARGE', 'SHOPPING', 'HEALTHCARE', 'RENT', 'TRAVEL', 'MISCELLANEOUS'];

  paymentDetailsLoading: boolean;
  paymentFetchError: boolean;
  editPaymentLoading: boolean;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentdetails: paymentdetails,
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar
  ) { 
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    if(this.checkIfProviderIsEmpty())
    {

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

        // console.log("CATEGORY", this.paymentdetails.payment.category);

      }
  }

  ngOnInit() {
  }

  checkIfProviderIsEmpty(): boolean {

    if(this.paymentdetails.payment.id === 0 &&
      this.paymentdetails.payment.amount === 0 &&
      this.paymentdetails.payment.category === '' &&
      this.paymentdetails.payment.createdAt === '' &&
      this.paymentdetails.payment.description === '' &&
      this.paymentdetails.payment.payee === '' &&
      this.paymentdetails.payment.payer === '' &&
      this.paymentdetails.payment.updatedAt === '')
      return true;

    return false;
  }

  setPaymentDetailsToFields(paymentdetails: IPaymentResponse) {

    this.id = this.paymentdetails.payment.id;
    this.amount = this.paymentdetails.payment.amount;
    this.payee = this.paymentdetails.payment.payee;
    this.category = this.paymentdetails.payment.category;
    this.description = this.paymentdetails.payment.description;
    this.createdAt = this.paymentdetails.payment.createdAt;
    this.updatedAt = this.paymentdetails.payment.updatedAt;
    this.payer = this.paymentdetails.payment.payer;

  }

  editPayment(): void {

    if(this.validatePayment()){

      this.editPaymentLoading = true;

      this.payment.amount = this.amount.toString();
      this.payment.payee = this.payee;
      this.payment.description = this.description;
      this.payment.category = this.category.toUpperCase();

      console.log(this.payment);

      // create the upi payment first. Register payment in db after that is success

      this.paymentService.editPayment(this.payment, this.id).then(res => {
        console.log(res);
        if(res['success']){

          // clear fields
          this.clearFields();

          // loading is false
          this.editPaymentLoading = false;

          // show snackbar
          this.openSnackBar('Payment Edited!')

          // route to home page
          this.router.navigate(['/xtrack/menu/home']);

        }
      })
      .catch(err => {
       // console.log(err);
        // clear fields
        this.clearFields();
          
        // show snackbar
        this.openSnackBar('Error editing payment!');

        // route to home page
        this.router.navigate(['/xtrack/menu/home']);
      })


    } else {

      // display snackbar saying invalid form details
      this.openSnackBar('Invalid inputs!');
      this.editPaymentLoading = false;
    }
   

  }

  validatePayment(): boolean {
    if((this.amount === undefined) ||
    (this.category === undefined || this.category === "") ||
    (this.description === undefined || this.description === "") ||
    (this.payee === undefined || this.payee === ""))
      return false;
    return true;
  }

  clearFields(): void {
    this.amount = 0;
    this.category = '';
    this.description = '';
    this.payee = '';
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
