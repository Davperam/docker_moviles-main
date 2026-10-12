import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaclinicaViewPageRoutingModule } from './notaclinica-view-routing.module';

import { NotaclinicaViewPage } from './notaclinica-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaclinicaViewPageRoutingModule
  ],
  declarations: [NotaclinicaViewPage]
})
export class NotaclinicaViewPageModule {}
