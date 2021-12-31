import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovingPage } from './moving.page';

const routes: Routes = [
  {
    path: '',
    component: MovingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovingPageRoutingModule {}
