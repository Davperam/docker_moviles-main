import { SharedModule } from '../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CitasListPageRoutingModule } from './citas-list-routing.module';

import { CitasListPage } from './citas-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CitasListPageRoutingModule
  ],
  declarations: [CitasListPage]
})
export class CitasListPageModule {}
