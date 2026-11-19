import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { PacienteCitasPageRoutingModule } from './paciente-citas-routing.module';

import { PacienteCitasPage } from './paciente-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PacienteCitasPageRoutingModule
  ],
  declarations: [PacienteCitasPage]
})
export class PacienteCitasPageModule {}
