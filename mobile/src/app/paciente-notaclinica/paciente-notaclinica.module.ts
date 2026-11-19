import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { PacienteNotaclinicaPageRoutingModule } from './paciente-notaclinica-routing.module';

import { PacienteNotaclinicaPage } from './paciente-notaclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PacienteNotaclinicaPageRoutingModule
  ],
  declarations: [PacienteNotaclinicaPage]
})
export class PacienteNotaclinicaPageModule {}
