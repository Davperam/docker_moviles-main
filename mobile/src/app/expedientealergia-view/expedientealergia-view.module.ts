import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientealergiaViewPageRoutingModule } from './expedientealergia-view-routing.module';

import { ExpedientealergiaViewPage } from './expedientealergia-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientealergiaViewPageRoutingModule
  ],
  declarations: [ExpedientealergiaViewPage]
})
export class ExpedientealergiaViewPageModule {}
