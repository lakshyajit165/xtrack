import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { loginStatus } from './providers/loginStatus.provider';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit{

  previousPage: string;

  // @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  @ViewChild(IonRouterOutlet, { static: true}) routerOutlet: IonRouterOutlet;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  closeAppAlertOpen: boolean = false;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController,
    private location: Location,
    private _router: Router,
   
    public alertController: AlertController,
    private loginstatus: loginStatus,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.backButtonEvent();

  }

  

  ngOnInit(): void {
  

  }

  ngOnDestroy(): void {
    this.platform.backButton.unsubscribe();
  }

  routeFunction(route: string): void {
    this._router.navigate([route]);
  }

  
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      if((this._router.url === '/xtrack/menu/home' || this._router.url === "/login")) {
        // console.log("--------------------------", this._router.url);
        if(this.closeAppAlertOpen){
          this.closeAppAlertOpen = false;
          navigator['app'].exitApp();
        }

        this.backButtonAlert();
      } else {
        this.location.back();
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'Do you want to exit the app?',
      buttons:[{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.closeAppAlertOpen = false; 
        }
      }, {
        text: 'Close App',
        handler: () => {
          this.closeAppAlertOpen = false;
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present().then(() => {
      this.closeAppAlertOpen = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.authService.isLoggedIn().then(res => {
        if(res) {
          this.loginstatus.status = true;
          
          // route to home page if user is already logged in and trying to access login/register route
          // console.log("user logged in! ", this.loginstatus.status);
          if(this._router.url === "/login" || this._router.url === "/register")
            this._router.navigate(["/xtrack/menu/home"]);
        } else {
          this.loginstatus.status = false;
          // console.log("user not logged in!");
        }
      })
      .catch(err => {
        this.loginstatus.status = false;
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 
}
