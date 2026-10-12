import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlergiaFormPageRoutingModule } from './alergia-form-routing.module';

import { AlergiaFormPage } from './alergia-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlergiaFormPageRoutingModule
  ],
  declarations: [AlergiaFormPage]
})
export class AlergiaFormPageModule {}
