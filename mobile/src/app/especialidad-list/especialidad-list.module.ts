import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { IonicModule } from '@ionic/angular';

import { EspecialidadListPageRoutingModule } from './especialidad-list-routing.module';

import { EspecialidadListPage } from './especialidad-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    EspecialidadListPageRoutingModule
  ],
  declarations: [EspecialidadListPage]
})
export class EspecialidadListPageModule {}
