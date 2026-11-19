import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { DentistasViewPageRoutingModule } from './dentistas-view-routing.module';

import { DentistasViewPage } from './dentistas-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DentistasViewPageRoutingModule
  ],
  declarations: [DentistasViewPage]
})
export class DentistasViewPageModule {}
