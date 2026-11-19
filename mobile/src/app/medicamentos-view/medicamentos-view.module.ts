import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosViewPageRoutingModule } from './medicamentos-view-routing.module';

import { MedicamentosViewPage } from './medicamentos-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MedicamentosViewPageRoutingModule
  ],
  declarations: [MedicamentosViewPage]
})
export class MedicamentosViewPageModule {}
