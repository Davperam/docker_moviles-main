import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidadViewPageRoutingModule } from './especialidad-view-routing.module';

import { EspecialidadViewPage } from './especialidad-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialidadViewPageRoutingModule
  ],
  declarations: [EspecialidadViewPage]
})
export class EspecialidadViewPageModule {}
