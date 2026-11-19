import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';
import { IonicModule } from '@ionic/angular';

import { ExpedientealergiaViewPageRoutingModule } from './expedientealergia-view-routing.module';

import { ExpedientealergiaViewPage } from './expedientealergia-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpedientealergiaViewPageRoutingModule
  ],
  declarations: [ExpedientealergiaViewPage]
})
export class ExpedientealergiaViewPageModule {}
