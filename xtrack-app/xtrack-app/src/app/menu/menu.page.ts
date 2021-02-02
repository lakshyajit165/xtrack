import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

import { AuthService } from '../services/auth/auth.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { loginStatus } from '../providers/loginStatus.provider';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HomePage } from '../home/home.page';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';
  public selectedIndex = 0;
  currentUser: string;
  firstLetter: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

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
    },
    {
      name: 'History',
      path: '/xtrack/menu/payment-history',
      icon: 'swap-vertical'
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private loginstatus: loginStatus,
    private storage: NativeStorage,
    private menuCtrl: MenuController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url;
     // console.log(this.activePath);
    });

    
    console.log("menu page constructor called");
   
    
   
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

  onActivate(componentRef): void {
    // console.log("COMPONENT_REF", componentRef);
    if(componentRef instanceof HomePage)
      componentRef.loadDataForPieChart();
  }

  ionViewDidEnter() {
    console.log("did enter fired!");

    this.storage.getItem('user').then(val => {
      console.log("Current User ", val);
      this.currentUser = val;
      this.firstLetter = this.currentUser[0].toUpperCase();
    })
    .catch(err => {

    });

    // fetch current users data and store it in provider
  }

  logout(): void {
    this.authService.logOut().then(res => {
      if(res){
        this.menuCtrl.close();
        this.loginstatus.status = false;
        this.router.navigate(['login']);
        this.openSnackBar('Logout successful!');

      }else{
        this.openSnackBar('Error logging out!');
      }
    })
    .catch(err => {
      this.openSnackBar('Error logging out!');
    });

  }

  openSnackBar(msg: string) {
    
    // let theme = '';
    // console.log(msg);
    // this.themeService.isDarkTheme.subscribe(res => {
    //   theme = 'light-theme';
    // }, err => {
    //   theme = 'dark-theme';
    // });

    this._snackBar.open(msg, 'Close', {
     
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  
  

}
