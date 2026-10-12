import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosFormPageRoutingModule } from './servicios-form-routing.module';

import { ServiciosFormPage } from './servicios-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosFormPageRoutingModule
  ],
  declarations: [ServiciosFormPage]
})
export class ServiciosFormPageModule {}
