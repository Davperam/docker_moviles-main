import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { IonicModule } from '@ionic/angular';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { PacientesListPageRoutingModule } from './pacientes-list-routing.module';

import { PacientesListPage } from './pacientes-list.page';

import { PacientesFormPageModule } from '../pacientes-form/pacientes-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PaginacionModule,
    PacientesListPageRoutingModule,
    PacientesFormPageModule
  ],
  declarations: [PacientesListPage]
})
export class PacientesListPageModule {}
