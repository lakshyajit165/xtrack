import { Component, OnInit } from '@angular/core';
import { payeeData } from '../providers/payeeData.provider';
import { IPayment } from '../model/IPayment';
import { PaymentService } from '../services/payment/payment.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  amount: string;
  payee: string;
  description: string;
  category: string;

  categorylist = ['Food', 'Recharge', 'Shopping'];

  payment: IPayment = {
    amount: '',
    payee: '',
    description: '',
    category: ''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 

  constructor(
    private router: Router,
    private payeeData: payeeData,
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar
  ) {
    this.payee = this.payeeData.payeedata === undefined ? '' : this.payeeData.payeedata;
   }

  ngOnInit() {
  }

  makePayment() {

    if(this.validatePayment()){

      this.payment.amount = this.amount;
      this.payment.payee = this.payee;
      this.payment.description = this.description;
      this.payment.category = this.category.toUpperCase();

      console.log(this.payment);

      // create the upi payment first. Register payment in db after that is success

      this.paymentService.createPayment(this.payment).then(res => {
        console.log(res);
        if(res['success']){

          // clear fields
          this.clearFields();

          // show snackbar
          this.openSnackBar('Payment Successful!')

          // route to home page
          this.router.navigate(['/xtrack/menu/home']);

        }
      })
      .catch(err => {
       // console.log(err);
        // clear fields
        this.clearFields();
          
        // show snackbar
        this.openSnackBar('Error processing payment!');

        // route to home page
        this.router.navigate(['/xtrack/menu/home']);
      })


    } else {

      // display snackbar saying invalid form details
      this.openSnackBar('Invalid inputs!');
    }
   
  }

  categorySelected(item: string) {
    console.log(item);
  }

  validatePayment(): boolean {
    if((this.amount === undefined || this.amount === "") ||
    (this.category === undefined || this.category === "") ||
    (this.description === undefined || this.description === "") ||
    (this.payee === undefined || this.payee === ""))
      return false;
    return true;
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar'
    });
  }

  clearFields(): void {
    this.amount = '';
    this.category = '';
    this.description = '';
    this.payee = '';
  }
}
