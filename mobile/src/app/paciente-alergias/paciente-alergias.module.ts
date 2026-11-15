import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteAlergiasPageRoutingModule } from './paciente-alergias-routing.module';

import { PacienteAlergiasPage } from './paciente-alergias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteAlergiasPageRoutingModule
  ],
  declarations: [PacienteAlergiasPage]
})
export class PacienteAlergiasPageModule {}
