import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasFormPageRoutingModule } from './citas-form-routing.module';

import { CitasFormPage } from './citas-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     ReactiveFormsModule,
    CitasFormPageRoutingModule
  ],
  declarations: [CitasFormPage]
})
export class CitasFormPageModule {}
