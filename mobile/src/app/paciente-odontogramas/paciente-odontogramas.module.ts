import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { PacienteOdontogramasPageRoutingModule } from './paciente-odontogramas-routing.module';

import { PacienteOdontogramasPage } from './paciente-odontogramas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PacienteOdontogramasPageRoutingModule
  ],
  declarations: [PacienteOdontogramasPage]
})
export class PacienteOdontogramasPageModule {}
