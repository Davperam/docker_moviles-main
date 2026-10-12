import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesFormPageRoutingModule } from './pacientes-form-routing.module';

import { PacientesFormPage } from './pacientes-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PacientesFormPageRoutingModule
  ],
  declarations: [PacientesFormPage]
})
export class PacientesFormPageModule {}
