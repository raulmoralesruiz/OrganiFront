import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAllPage } from './show-all.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAllPageRoutingModule {}
