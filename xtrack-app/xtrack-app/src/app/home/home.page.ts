import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { payeeData } from '../providers/payeeData.provider';
import { AuthService } from '../services/auth/auth.service';
import { PaymentService } from '../services/payment/payment.service';

import { IPaymentResponse } from '../model/IPaymentResponse';

import {MatTableDataSource} from '@angular/material/table';
import { paymentdetails } from '../providers/paymentdetails.provider';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { ICategoryTotal } from '../model/ICategoryTotal';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  fromdate: string = "";
  todate: string = "";

  isLinear = false;

  categoryTotals: ICategoryTotal[];
  categoryDataLoading: boolean = true;

  // Pie chart
   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom'}
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF'],
  }];


  constructor(
    private router: Router,
    public platform: Platform,
    private authService: AuthService,
    private paymentService: PaymentService,
    private paymentdetails: paymentdetails,

  ) { 
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   document.getElementsByTagName('body')[0].style.opacity = '1';
    //   this.scanSub.unsubscribe();
    // });
    // this.authService.isLoggedIn().then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err);
    // })

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    console.log("HOME COMPONENT constructor!");



   
    
  }

 

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {
   console.log("home page ngoninit!");

   // ngOnInit - Initialize your component and load data from services that don't need refreshing on each subsequent visit.
    
    
  }

  testData(): void {
    console.log("TEST DATA from HOME");
  }
  
  ionViewDidEnter(): void {

   
     
  }

  loadDataForPieChart(): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.categoryDataLoading = true;
    
    this.todate = new Date().toISOString().split("T")[0];
    // set start date to 1 month prior to today's date
    
    
    let d = new Date();
    this.fromdate= d.toISOString();

    d.setMonth(d.getMonth() - 1);

    this.fromdate = d.toISOString().split("T")[0];

    this.paymentService.getCategoryWiseTotal(this.fromdate, this.todate)
    .then(res => {
      console.log("CATEGORY_WISE DATA");
      console.log(res);
      this.categoryDataLoading = false;

      
      for (const key in res) {
        this.pieChartLabels.push(res[key]['category']);
        this.pieChartData.push(res[key]['amount']);
        // console.log(res[key]['amount'], res[key]['category']);
      }
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  routeFunction(path: string): void {
    
    this.router.navigate([path]);
  }

 

 
  // getParamsFromUPIString(params: string, url: string): string {

  //   let href = url;
  //   let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
  //   let queryString = reg.exec(href);
  //   return queryString ? queryString[1] : null;

  // }

}
