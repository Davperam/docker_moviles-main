import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteMedicamentosPageRoutingModule } from './paciente-medicamentos-routing.module';

import { PacienteMedicamentosPage } from './paciente-medicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteMedicamentosPageRoutingModule
  ],
  declarations: [PacienteMedicamentosPage]
})
export class PacienteMedicamentosPageModule {}
