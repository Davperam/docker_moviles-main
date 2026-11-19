import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { ExpedientealergiaListPageRoutingModule } from './expedientealergia-list-routing.module';

import { ExpedientealergiaListPage } from './expedientealergia-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpedientealergiaListPageRoutingModule
  ],
  declarations: [ExpedientealergiaListPage]
})
export class ExpedientealergiaListPageModule {}
