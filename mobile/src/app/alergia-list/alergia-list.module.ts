import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlergiaListPageRoutingModule } from './alergia-list-routing.module';

import { AlergiaListPage } from './alergia-list.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    IonicModule,
    AlergiaListPageRoutingModule
  ],
  declarations: [AlergiaListPage]
})
export class AlergiaListPageModule {}
