import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

import { IonicModule } from '@ionic/angular';

import { MetodopagoListPageRoutingModule } from './metodopago-list-routing.module';

import { MetodopagoListPage } from './metodopago-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    MetodopagoListPageRoutingModule
  ],
  declarations: [MetodopagoListPage]
})
export class MetodopagoListPageModule {}
