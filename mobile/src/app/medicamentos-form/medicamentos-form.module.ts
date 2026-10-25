import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosFormPageRoutingModule } from './medicamentos-form-routing.module';

import { MedicamentosFormPage } from './medicamentos-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MedicamentosFormPageRoutingModule
  ],
  declarations: [MedicamentosFormPage]
})
export class MedicamentosFormPageModule {}
