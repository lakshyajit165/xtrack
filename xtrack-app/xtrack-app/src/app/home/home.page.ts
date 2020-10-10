import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  startdate="2020-10-10";
  enddate="2020-11-10";
  constructor() { }

  chartType(event: any) {
    console.log(event.detail.value);
  }

}
