import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosViewPageRoutingModule } from './medicamentos-view-routing.module';

import { MedicamentosViewPage } from './medicamentos-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentosViewPageRoutingModule
  ],
  declarations: [MedicamentosViewPage]
})
export class MedicamentosViewPageModule {}
