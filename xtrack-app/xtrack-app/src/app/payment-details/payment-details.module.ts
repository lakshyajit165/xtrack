import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { PaymentDetailsPage } from './payment-details.page';

import { MaterialModule } from '../material/material.module';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PaymentDetailsPageRoutingModule
  ],
  declarations: [PaymentDetailsPage]
})
export class PaymentDetailsPageModule {}
