import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdontogramasViewPageRoutingModule } from './odontogramas-view-routing.module';

import { OdontogramasViewPage } from './odontogramas-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdontogramasViewPageRoutingModule
  ],
  declarations: [OdontogramasViewPage]
})
export class OdontogramasViewPageModule {}
