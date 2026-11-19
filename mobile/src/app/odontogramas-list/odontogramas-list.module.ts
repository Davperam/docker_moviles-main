import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OdontogramasListPageRoutingModule } from './odontogramas-list-routing.module';

import { OdontogramasListPage } from './odontogramas-list.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OdontogramasListPageRoutingModule
  ],
  declarations: [OdontogramasListPage]
})
export class OdontogramasListPageModule {}
