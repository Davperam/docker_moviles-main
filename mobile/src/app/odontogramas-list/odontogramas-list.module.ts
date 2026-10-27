import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { IonicModule } from '@ionic/angular';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { OdontogramasListPageRoutingModule } from './odontogramas-list-routing.module';

import { OdontogramasListPage } from './odontogramas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginacionModule,
    ToolbarModule,
    OdontogramasListPageRoutingModule
  ],
  declarations: [OdontogramasListPage]
})
export class OdontogramasListPageModule {}
