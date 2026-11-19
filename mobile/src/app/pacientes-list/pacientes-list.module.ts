import { NgModule } from '@angular/core';
import { SharedModule } from '../components/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PacientesListPageRoutingModule } from './pacientes-list-routing.module';

import { PacientesListPage } from './pacientes-list.page';

import { PacientesFormPageModule } from '../pacientes-form/pacientes-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule ,
    PacientesListPageRoutingModule,
    PacientesFormPageModule
  ],
  declarations: [PacientesListPage]
})
export class PacientesListPageModule {}
