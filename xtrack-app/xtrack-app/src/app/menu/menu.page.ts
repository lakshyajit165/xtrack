import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

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
    },
    {
      name: 'Add Expense',
      path: '/xtrack/menu/add-expense',
      icon: 'add-circle'
    }
  ]

  constructor(
    private router: Router,
    authService: AuthService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url;
     // console.log(this.activePath);
    })

   
    
   
  }

  ngOnInit() {
    // const path = window.location.pathname.split('xtrack/menu/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.pages.findIndex(page => {
        
    //     let pname = page.name;
    //     pname = pname === 'Add Expense' ? 'add-expense' : pname;
    //     console.log(pname);
    //     return pname.toLowerCase() === path.toLowerCase()
    //   });
    // }
   
  }

  
  

}
