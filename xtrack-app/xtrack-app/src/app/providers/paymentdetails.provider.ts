import { Injectable } from '@angular/core';
import { IPaymentResponse } from '../model/IPaymentResponse';

@Injectable()
export class paymentdetails {

    public payment: IPaymentResponse = {
        id: 0,
        amount: 0,
        category: '',
        createdAt: '',
        description: '',
        payee: '',
        payer: '',
        updatedAt: ''

    }

    public constructor() { }

}
