import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlergiaViewPageRoutingModule } from './alergia-view-routing.module';

import { AlergiaViewPage } from './alergia-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlergiaViewPageRoutingModule
  ],
  declarations: [AlergiaViewPage]
})
export class AlergiaViewPageModule {}
