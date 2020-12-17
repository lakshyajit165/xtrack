import { Component, OnInit } from '@angular/core';

import { AlertController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PreviousrouteService } from './services/previousroute.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit{

  previousPage: string;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController,
    private location: Location,
    private _router: Router,
    private _previousRouteService: PreviousrouteService,
    public alertController: AlertController
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
  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      //console.log(this.previousPage);
      console.log('Handler was called!');

      if (this.location.isCurrentPathEqualTo('/xtrack/menu/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        
        this.showExitConfirm();
       // processNextHandler();
      } else {
        this.routeFunction(this.previousPage);
        
      }
    });

  }

  ngOnDestroy(): void {
    
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 
}
