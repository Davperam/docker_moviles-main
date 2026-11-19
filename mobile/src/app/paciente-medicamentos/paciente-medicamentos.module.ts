import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { PacienteMedicamentosPageRoutingModule } from './paciente-medicamentos-routing.module';

import { PacienteMedicamentosPage } from './paciente-medicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PacienteMedicamentosPageRoutingModule
  ],
  declarations: [PacienteMedicamentosPage]
})
export class PacienteMedicamentosPageModule {}
