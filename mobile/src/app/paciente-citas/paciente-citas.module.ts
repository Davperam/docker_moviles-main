import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteCitasPageRoutingModule } from './paciente-citas-routing.module';

import { PacienteCitasPage } from './paciente-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteCitasPageRoutingModule
  ],
  declarations: [PacienteCitasPage]
})
export class PacienteCitasPageModule {}
