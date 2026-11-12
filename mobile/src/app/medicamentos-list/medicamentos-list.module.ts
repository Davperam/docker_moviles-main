import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { IonicModule } from '@ionic/angular';

import { MedicamentosListPageRoutingModule } from './medicamentos-list-routing.module';

import { MedicamentosListPage } from './medicamentos-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PaginacionModule,
    MedicamentosListPageRoutingModule
  ],
  declarations: [MedicamentosListPage]
})
export class MedicamentosListPageModule {}
