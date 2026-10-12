import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistaespecialidadFormPageRoutingModule } from './dentistaespecialidad-form-routing.module';

import { DentistaespecialidadFormPage } from './dentistaespecialidad-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistaespecialidadFormPageRoutingModule
  ],
  declarations: [DentistaespecialidadFormPage]
})
export class DentistaespecialidadFormPageModule {}
