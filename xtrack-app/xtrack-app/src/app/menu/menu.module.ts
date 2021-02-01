import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home'
  },
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
        // loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule'
      },
      {
        path: 'add-expense',
        loadChildren: '../add-expense/add-expense.module#AddExpensePageModule'
      },
      {
        path: 'payment-details/:id',
        loadChildren: () => import('../payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule)
      },
      {
        path: 'payment-history',
        loadChildren: () => import('../payment-history/payment-history.module').then(m => m.PaymentHistoryPageModule)
      }
    ]
  }
 
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})

export class MenuPageModule { }