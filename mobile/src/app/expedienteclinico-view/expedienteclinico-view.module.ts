import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedienteclinicoViewPageRoutingModule } from './expedienteclinico-view-routing.module';

import { ExpedienteclinicoViewPage } from './expedienteclinico-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpedienteclinicoViewPageRoutingModule
  ],
  declarations: [ExpedienteclinicoViewPage]
})
export class ExpedienteclinicoViewPageModule {}
