import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedienteclinicoListPageRoutingModule } from './expedienteclinico-list-routing.module';

import { ExpedienteclinicoListPage } from './expedienteclinico-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedienteclinicoListPageRoutingModule
  ],
  declarations: [ExpedienteclinicoListPage]
})
export class ExpedienteclinicoListPageModule {}
