import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedienteclinicoListPageRoutingModule } from './expedienteclinico-list-routing.module';

import { ExpedienteclinicoListPage } from './expedienteclinico-list.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpedienteclinicoListPageRoutingModule
  ],
  declarations: [ExpedienteclinicoListPage]
})
export class ExpedienteclinicoListPageModule {}
