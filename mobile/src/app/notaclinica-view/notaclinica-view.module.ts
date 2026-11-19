import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaclinicaViewPageRoutingModule } from './notaclinica-view-routing.module';

import { NotaclinicaViewPage } from './notaclinica-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NotaclinicaViewPageRoutingModule
  ],
  declarations: [NotaclinicaViewPage]
})
export class NotaclinicaViewPageModule {}
