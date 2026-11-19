import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientemedicamentoViewPageRoutingModule } from './expedientemedicamento-view-routing.module';

import { ExpedientemedicamentoViewPage } from './expedientemedicamento-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpedientemedicamentoViewPageRoutingModule
  ],
  declarations: [ExpedientemedicamentoViewPage]
})
export class ExpedientemedicamentoViewPageModule {}
