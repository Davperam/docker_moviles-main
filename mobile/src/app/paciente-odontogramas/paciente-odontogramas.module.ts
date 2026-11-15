import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteOdontogramasPageRoutingModule } from './paciente-odontogramas-routing.module';

import { PacienteOdontogramasPage } from './paciente-odontogramas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteOdontogramasPageRoutingModule
  ],
  declarations: [PacienteOdontogramasPage]
})
export class PacienteOdontogramasPageModule {}
