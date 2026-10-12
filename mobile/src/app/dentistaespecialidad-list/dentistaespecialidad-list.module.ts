import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistaespecialidadListPageRoutingModule } from './dentistaespecialidad-list-routing.module';

import { DentistaespecialidadListPage } from './dentistaespecialidad-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistaespecialidadListPageRoutingModule
  ],
  declarations: [DentistaespecialidadListPage]
})
export class DentistaespecialidadListPageModule {}
