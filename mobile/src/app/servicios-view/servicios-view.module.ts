import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosViewPageRoutingModule } from './servicios-view-routing.module';

import { ServiciosViewPage } from './servicios-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiciosViewPageRoutingModule
  ],
  declarations: [ServiciosViewPage]
})
export class ServiciosViewPageModule {}
