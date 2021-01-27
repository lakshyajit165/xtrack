import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaymentResponse } from '../model/IPaymentResponse';
import { paymentdetails } from '../providers/paymentdetails.provider';
import { PaymentService } from '../services/payment/payment.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface DeleteDialogData {
  tid: number;
}



@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  id: number;
  displayedId: string = 'XT240920';
  amount: number = 0;
  category: string = '';
  createdAt: string = '';
  description: string = '';
  payee: string = '';
  payer: string = '';
  updatedAt: string = '';

  paymentFetchError: boolean = false;
  paymentDetailsLoading: boolean = false;

  public paymentTemp: IPaymentResponse = {
    id: 0,
    amount: 0,
    category: '',
    createdAt: '',
    description: '',
    payee: '',
    payer: '',
    updatedAt: ''

}

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paymentdetails: paymentdetails,
    private paymentService: PaymentService,
    public dialog: MatDialog,
  ) { 
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.displayedId += this.id.toString();
    console.log("Displayed ID: ", this.displayedId);

    console.log(this.router.url);

    

      // check if provider is undefined, fetch from service
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
  
      }
    
  }

  ngOnInit() {

  
    
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

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeletePaymentDialog, {
      data: {
        tid: id 
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // if(result){
      //   this.deletePayment(id);
        
      // }
        
    });


  }


 


}

@Component({
  selector: 'delete-payment-dialog',
  templateUrl: 'delete-payment-dialog.html'
})
export class DeletePaymentDialog {

  tid: number;
  deleteloading: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {
    this.tid = this.data.tid;
  }

  deletePayment(): void {
    this.deleteloading = true;
    console.log('delete payment!');

    this.paymentService.deletePayment(this.tid)
    .then(res => {
      console.log(res);

      // set loading to false
      this.deleteloading = false;

      // open snackbar to show success msg
      if(res['success']){
        this.openSnackBar('Transaction deleted!');
      } else {
        this.openSnackBar('Error deleting transaction!');
      }

      // close the dialog.
      this.dialogRef.close();

      // route to history page
      this.router.navigate(['/xtrack/menu/payment-history']);

    })
    .catch(err => {

      // open snack back to show err msg
      this.openSnackBar('Error deleting transaction!');

      // close dialog box
      this.dialogRef.close();

    });
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



