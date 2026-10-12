import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedienteclinicoViewPageRoutingModule } from './expedienteclinico-view-routing.module';

import { ExpedienteclinicoViewPage } from './expedienteclinico-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedienteclinicoViewPageRoutingModule
  ],
  declarations: [ExpedienteclinicoViewPage]
})
export class ExpedienteclinicoViewPageModule {}
