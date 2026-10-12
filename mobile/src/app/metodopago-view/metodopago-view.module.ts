import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodopagoViewPageRoutingModule } from './metodopago-view-routing.module';

import { MetodopagoViewPage } from './metodopago-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodopagoViewPageRoutingModule
  ],
  declarations: [MetodopagoViewPage]
})
export class MetodopagoViewPageModule {}
