import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadocitaFormPageRoutingModule } from './estadocita-form-routing.module';

import { EstadocitaFormPage } from './estadocita-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadocitaFormPageRoutingModule
  ],
  declarations: [EstadocitaFormPage]
})
export class EstadocitaFormPageModule {}
