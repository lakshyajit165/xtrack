import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthRouteGuard } from './services/auth/authroute.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'xtrack',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'xtrack',
    loadChildren: './menu/menu.module#MenuPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule',
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'qrscan',
    loadChildren: () => import('./qrscan/qrscan.module').then( m => m.QrscanPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }