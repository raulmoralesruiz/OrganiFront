import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovingPageRoutingModule } from './moving-routing.module';

import { MovingPage } from './moving.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovingPageRoutingModule
  ],
  declarations: [MovingPage]
})
export class MovingPageModule {}
