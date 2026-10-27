import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { IonicModule } from '@ionic/angular';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { CitasListPageRoutingModule } from './citas-list-routing.module';

import { CitasListPage } from './citas-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PaginacionModule,
    CitasListPageRoutingModule
  ],
  declarations: [CitasListPage]
})
export class CitasListPageModule {}
