import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

import { IonicModule } from '@ionic/angular';

import { ExpedientemedicamentoListPageRoutingModule } from './expedientemedicamento-list-routing.module';

import { ExpedientemedicamentoListPage } from './expedientemedicamento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    ExpedientemedicamentoListPageRoutingModule
  ],
  declarations: [ExpedientemedicamentoListPage]
})
export class ExpedientemedicamentoListPageModule {}
