import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PreviousrouteService } from './services/previousroute.service';
import { loginStatus } from './providers/loginStatus.provider';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit{

  previousPage: string;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController,
    private location: Location,
    private _router: Router,
    private _previousRouteService: PreviousrouteService,
    public alertController: AlertController,
    private loginstatus: loginStatus,
    private authService: AuthService
  ) {
    this.initializeApp();

    console.log('contructor called!')
    
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousPage = _previousRouteService.getPreviousUrl();
        console.log(this.previousPage);
        if (!this.previousPage) {
          this.previousPage = '/xtrack';
          
        }
      }
    });

    this.backButtonEvent();

   
    // this.platform.backButton.subscribeWithPriority(5, () => {
    //   console.log('Handler called to force close!');
    //   this.alertController.getTop().then(r => {
    //     if (r) {
    //       navigator['app'].exitApp();
    //     }
    //   }).catch(e => {
    //     console.log(e);
    //   })
    // });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999, () => {
      console.log('back btn clicked');
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (this._router.url != '/xtrack/menu/home') {
          // await this.router.navigate(['/']);
         // await this.location.back();
         this.routeFunction(this.previousPage);
        } else if (this._router.url === '/xtrack/menu/home' || this._router.url === "/login") {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  
    await alert.present();
  }

  ngOnInit(): void {
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   //console.log(this.previousPage);
    //   console.log('Handler was called!');

    //   if (this.location.isCurrentPathEqualTo('/xtrack/menu/home')) {

    //     // Show Exit Alert!
    //     console.log('Show Exit Alert!');
        
    //     this.showExitConfirm();
    //    // processNextHandler();
    //   } else {
    //     this.routeFunction(this.previousPage);
        
    //   }
    // });

  }

  ngOnDestroy(): void {
    this.platform.backButton.unsubscribe();
  }

  routeFunction(route: string): void {
    this._router.navigate([route]);
  }

  showExitConfirm() {
    console.log('modal displayed!');
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: true,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          this.alertController.dismiss();
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
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
          console.log("user not logged in!");
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
