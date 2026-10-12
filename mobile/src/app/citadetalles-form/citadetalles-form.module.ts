import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitadetallesFormPageRoutingModule } from './citadetalles-form-routing.module';

import { CitadetallesFormPage } from './citadetalles-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitadetallesFormPageRoutingModule
  ],
  declarations: [CitadetallesFormPage]
})
export class CitadetallesFormPageModule {}
