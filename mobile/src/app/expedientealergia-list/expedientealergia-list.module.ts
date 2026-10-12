import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientealergiaListPageRoutingModule } from './expedientealergia-list-routing.module';

import { ExpedientealergiaListPage } from './expedientealergia-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientealergiaListPageRoutingModule
  ],
  declarations: [ExpedientealergiaListPage]
})
export class ExpedientealergiaListPageModule {}
