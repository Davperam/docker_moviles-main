import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteNotaclinicaPageRoutingModule } from './paciente-notaclinica-routing.module';

import { PacienteNotaclinicaPage } from './paciente-notaclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteNotaclinicaPageRoutingModule
  ],
  declarations: [PacienteNotaclinicaPage]
})
export class PacienteNotaclinicaPageModule {}
