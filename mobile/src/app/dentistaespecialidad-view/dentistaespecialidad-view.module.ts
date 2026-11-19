import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { DentistaespecialidadViewPageRoutingModule } from './dentistaespecialidad-view-routing.module';

import { DentistaespecialidadViewPage } from './dentistaespecialidad-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DentistaespecialidadViewPageRoutingModule
  ],
  declarations: [DentistaespecialidadViewPage]
})
export class DentistaespecialidadViewPageModule {}
