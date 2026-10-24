import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistasListPageRoutingModule } from './dentistas-list-routing.module';

import { DentistasListPage } from './dentistas-list.page';
import { DentistasFormPageModule } from '../dentistas-form/dentistas-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistasListPageRoutingModule
  ],
  declarations: [DentistasListPage]
})
export class DentistasListPageModule {}
