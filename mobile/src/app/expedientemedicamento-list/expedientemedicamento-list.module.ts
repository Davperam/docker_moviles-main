import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientemedicamentoListPageRoutingModule } from './expedientemedicamento-list-routing.module';

import { ExpedientemedicamentoListPage } from './expedientemedicamento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientemedicamentoListPageRoutingModule
  ],
  declarations: [ExpedientemedicamentoListPage]
})
export class ExpedientemedicamentoListPageModule {}
