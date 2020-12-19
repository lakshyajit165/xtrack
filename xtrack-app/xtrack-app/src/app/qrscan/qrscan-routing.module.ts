import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrscanPage } from './qrscan.page';

const routes: Routes = [
  {
    path: '',
    component: QrscanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrscanPageRoutingModule {}
