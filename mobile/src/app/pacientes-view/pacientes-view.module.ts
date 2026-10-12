import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesViewPageRoutingModule } from './pacientes-view-routing.module';

import { PacientesViewPage } from './pacientes-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesViewPageRoutingModule
  ],
  declarations: [PacientesViewPage]
})
export class PacientesViewPageModule {}
