import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosclinicosFormPageRoutingModule } from './documentosclinicos-form-routing.module';

import { DocumentosclinicosFormPage } from './documentosclinicos-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     ReactiveFormsModule,
    DocumentosclinicosFormPageRoutingModule
  ],
  declarations: [DocumentosclinicosFormPage]
})
export class DocumentosclinicosFormPageModule {}
