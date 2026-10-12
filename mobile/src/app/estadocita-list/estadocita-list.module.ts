import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadocitaListPageRoutingModule } from './estadocita-list-routing.module';

import { EstadocitaListPage } from './estadocita-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadocitaListPageRoutingModule
  ],
  declarations: [EstadocitaListPage]
})
export class EstadocitaListPageModule {}
