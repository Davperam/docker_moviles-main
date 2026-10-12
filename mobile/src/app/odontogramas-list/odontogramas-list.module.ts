import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdontogramasListPageRoutingModule } from './odontogramas-list-routing.module';

import { OdontogramasListPage } from './odontogramas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdontogramasListPageRoutingModule
  ],
  declarations: [OdontogramasListPage]
})
export class OdontogramasListPageModule {}
