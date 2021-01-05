import { Injectable } from '@angular/core';
import { api } from 'src/app/providers/api.provider';
import { HTTP } from '@ionic-native/http/ngx';
import { IPayment } from '../../model/IPayment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HTTP,
    private api: api,
    private storage: NativeStorage
  ) { }

  serviceRoute = this.api.serviceRoute;

  // create payment

  async createPayment(payment: IPayment): Promise<object> {
    
    let response: object;
    this.http.setDataSerializer('json');

    let headers = {};
    // set the headers
    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    await this.http.post(this.serviceRoute + 'api/v1/payments/create', payment, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      
      response = JSON.parse(err.error);
     
    });

    return response;
  }

  // edit payment

  async editPayment(payment: IPayment, id: number): Promise<object> {

    let headers = {};
    // set the headers
    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    let response: object;
    this.http.setDataSerializer('json');

    await this.http.patch(this.serviceRoute + 'api/v1/payments/mypayments/'+id, payment, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

    return response;
  }

  // delete payment

  async deletePayment(id: number): Promise<object> {

    let headers = {};
    // set the headers
    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    let response: object;
    this.http.setDataSerializer('json');

    await this.http.delete(this.serviceRoute + 'api/v1/payments/'+id, id, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

    return response;

  }


}
