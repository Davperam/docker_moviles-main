import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdontogramasFormPageRoutingModule } from './odontogramas-form-routing.module';

import { OdontogramasFormPage } from './odontogramas-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdontogramasFormPageRoutingModule
  ],
  declarations: [OdontogramasFormPage]
})
export class OdontogramasFormPageModule {}
