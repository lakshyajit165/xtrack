import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';

  pages = [
   
    {
      name: 'Home',
      path: '/xtrack/menu/home',
      icon: 'home'
    },
    {
      name: 'About',
      path: '/xtrack/menu/about',
      icon: 'information'
    }
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url
    })
  }

  ngOnInit() {
  }

}
