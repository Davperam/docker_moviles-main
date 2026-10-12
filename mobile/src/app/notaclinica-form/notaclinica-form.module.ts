import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaclinicaFormPageRoutingModule } from './notaclinica-form-routing.module';

import { NotaclinicaFormPage } from './notaclinica-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaclinicaFormPageRoutingModule
  ],
  declarations: [NotaclinicaFormPage]
})
export class NotaclinicaFormPageModule {}
