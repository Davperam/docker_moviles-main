import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteExpedientePageRoutingModule } from './paciente-expediente-routing.module';

import { PacienteExpedientePage } from './paciente-expediente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteExpedientePageRoutingModule
  ],
  declarations: [PacienteExpedientePage]
})
export class PacienteExpedientePageModule {}
