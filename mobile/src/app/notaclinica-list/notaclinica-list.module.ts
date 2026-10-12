import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaclinicaListPageRoutingModule } from './notaclinica-list-routing.module';

import { NotaclinicaListPage } from './notaclinica-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaclinicaListPageRoutingModule
  ],
  declarations: [NotaclinicaListPage]
})
export class NotaclinicaListPageModule {}
