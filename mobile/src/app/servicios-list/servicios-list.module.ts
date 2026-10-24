import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosListPageRoutingModule } from './servicios-list-routing.module';

import { ServiciosListPage } from './servicios-list.page';
import { ServiciosFormPageModule } from '../servicios-form/servicios-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosListPageRoutingModule
  ],
  declarations: [ServiciosListPage]
})
export class ServiciosListPageModule {}
