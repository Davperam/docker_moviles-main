import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosListPageRoutingModule } from './medicamentos-list-routing.module';

import { MedicamentosListPage } from './medicamentos-list.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MedicamentosListPageRoutingModule
  ],
  declarations: [MedicamentosListPage]
})
export class MedicamentosListPageModule {}
