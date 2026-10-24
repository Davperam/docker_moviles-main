import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosFormPageRoutingModule } from './pagos-form-routing.module';

import { PagosFormPage } from './pagos-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PagosFormPageRoutingModule
  ],
  declarations: [PagosFormPage]
})
export class PagosFormPageModule {}
