import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistasFormPageRoutingModule } from './dentistas-form-routing.module';

import { DentistasFormPage } from './dentistas-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistasFormPageRoutingModule
  ],
  declarations: [DentistasFormPage]
})
export class DentistasFormPageModule {}
