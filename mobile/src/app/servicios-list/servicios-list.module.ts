import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

import { IonicModule } from '@ionic/angular';

import { ServiciosListPageRoutingModule } from './servicios-list-routing.module';

import { ServiciosListPage } from './servicios-list.page';

import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiciosListPageRoutingModule
  ],
  declarations: [ServiciosListPage]
})
export class ServiciosListPageModule {}
