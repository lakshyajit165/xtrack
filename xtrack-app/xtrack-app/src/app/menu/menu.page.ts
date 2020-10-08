import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';
  public selectedIndex = 0;

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
      this.activePath = event.url;
      //console.log(this.activePath);
    })
  }

  ngOnInit() {
    const path = window.location.pathname.split('xtrack/menu/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.pages.findIndex(page => page.name.toLowerCase() === path.toLowerCase());
    }
  }

}
