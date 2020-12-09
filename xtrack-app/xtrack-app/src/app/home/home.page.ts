import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  startdate="2020-10-10";
  enddate="2020-11-10";

  constructor(
    private router: Router
  ) { }

  chartType(event: any) {
    console.log(event.detail.value);
  }

  ngOnInit(): void {

  }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

}
