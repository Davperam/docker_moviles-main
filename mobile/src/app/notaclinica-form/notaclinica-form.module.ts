import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaclinicaFormPageRoutingModule } from './notaclinica-form-routing.module';

import { NotaclinicaFormPage } from './notaclinica-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotaclinicaFormPageRoutingModule
  ],
  declarations: [NotaclinicaFormPage]
})
export class NotaclinicaFormPageModule {}
