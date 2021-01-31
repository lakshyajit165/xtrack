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

    await this.http.post(this.serviceRoute + 'v1/payments/create', payment, headers)
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

    await this.http.patch(this.serviceRoute + 'v1/payments/mypayments/'+id, payment, headers)
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

    console.log('inside delete service')

    await this.http.delete(this.serviceRoute + 'v1/payments/'+id, {}, headers)
    .then(res => {
      console.log("Inside service: success: ", res);
      response = JSON.parse(res.data);
    })
    .catch(err => {
      console.log("Inside service err: ", err);
      response = JSON.parse(err.error);
    })

    return response;

  }

  // get my payments (pass page and size) - WITHOUT DATE FILTERS
  async getMyPayments(page: number, size: number): Promise<object> {

    console.log("MY PAYMENTS called!");

    let headers = {};
    // set the headers
    let response: object;
    this.http.setDataSerializer('json');

    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    console.log("DISPLAYING headers  from service: ", headers);
    await this.http.get(this.serviceRoute + 'v1/payments/mypayments?page=' + page + '&size=' + size, {}, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

  

   

    return response;

  }

  // get my payments (pass page and size) - WITH DATE FILTERS
  async getMyPaymentsByDate(from: string, to: string, page: number, size: number): Promise<object> {

    console.log("MY PAYMENTS WITH FILTERS called!", from , to);


    let headers = {};
    // set the headers
    let response: object;
    this.http.setDataSerializer('json');

    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    console.log("DISPLAYING headers  from service: ", headers);
    await this.http.get(this.serviceRoute + 'v1/payments/mypayments/filtered?from=' + from + '&to=' + to + '&page=' + page + '&size=' + size, {}, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

  

   

    return response;

  }

  // get categorywise total
  async getCategoryWiseTotal(from: string, to: string): Promise<object> {

    let headers = {};
    // set the headers
    let response: object;
    this.http.setDataSerializer('json');

    await this.storage.getItem('key')
    .then(res => {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+res
      };
    })
    .catch(err => {

      
    })

    await this.http.get(this.serviceRoute + 'v1/payments/mypayments/categorytotal?from=' + from + '&to=' + to, {}, headers)
    .then(res => {
      response = JSON.parse(res.data);
      console.log("INSIDE SERVICE----------------------------------------");
      console.log(res);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

  

   

    return response;
  }

  // get payment by id:
  async getPaymentById(id: number): Promise<object> {

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

    await this.http.get(this.serviceRoute + 'v1/payments/mypayments/'+id, {}, headers)
    .then(res => {
      response = JSON.parse(res.data);
    })
    .catch(err => {
      response = JSON.parse(err.error);
    })

    return response;
  }

}
