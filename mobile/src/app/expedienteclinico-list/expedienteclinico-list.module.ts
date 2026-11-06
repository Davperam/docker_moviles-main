import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { IonicModule } from '@ionic/angular';

import { ExpedienteclinicoListPageRoutingModule } from './expedienteclinico-list-routing.module';

import { ExpedienteclinicoListPage } from './expedienteclinico-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PaginacionModule,
    ExpedienteclinicoListPageRoutingModule
  ],
  declarations: [ExpedienteclinicoListPage]
})
export class ExpedienteclinicoListPageModule {}
