import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { DeletePaymentDialog, PaymentDetailsPage } from './payment-details.page';

import { MaterialModule } from '../material/material.module';

import { MatDialogModule } from '@angular/material/dialog';

 

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    MatDialogModule,
    PaymentDetailsPageRoutingModule
  ],
  declarations: [PaymentDetailsPage]
})
export class PaymentDetailsPageModule {}
