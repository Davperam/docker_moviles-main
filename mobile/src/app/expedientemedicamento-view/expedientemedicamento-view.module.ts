import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientemedicamentoViewPageRoutingModule } from './expedientemedicamento-view-routing.module';

import { ExpedientemedicamentoViewPage } from './expedientemedicamento-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientemedicamentoViewPageRoutingModule
  ],
  declarations: [ExpedientemedicamentoViewPage]
})
export class ExpedientemedicamentoViewPageModule {}
