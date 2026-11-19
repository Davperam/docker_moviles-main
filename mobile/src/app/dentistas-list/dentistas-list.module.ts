import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../components/shared.module';


import { DentistasListPageRoutingModule } from './dentistas-list-routing.module';

import { DentistasListPage } from './dentistas-list.page';
import { DentistasFormPageModule } from '../dentistas-form/dentistas-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DentistasListPageRoutingModule
  ],
  declarations: [DentistasListPage]
})
export class DentistasListPageModule {}
