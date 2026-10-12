import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistaespecialidadViewPageRoutingModule } from './dentistaespecialidad-view-routing.module';

import { DentistaespecialidadViewPage } from './dentistaespecialidad-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistaespecialidadViewPageRoutingModule
  ],
  declarations: [DentistaespecialidadViewPage]
})
export class DentistaespecialidadViewPageModule {}
