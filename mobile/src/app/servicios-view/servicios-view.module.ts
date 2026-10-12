import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosViewPageRoutingModule } from './servicios-view-routing.module';

import { ServiciosViewPage } from './servicios-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosViewPageRoutingModule
  ],
  declarations: [ServiciosViewPage]
})
export class ServiciosViewPageModule {}
