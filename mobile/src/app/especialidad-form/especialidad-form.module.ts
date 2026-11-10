import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidadFormPageRoutingModule } from './especialidad-form-routing.module';

import { EspecialidadFormPage } from './especialidad-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EspecialidadFormPageRoutingModule
  ],
  declarations: [EspecialidadFormPage]
})
export class EspecialidadFormPageModule {}
