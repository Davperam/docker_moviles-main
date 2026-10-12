import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadocitaViewPageRoutingModule } from './estadocita-view-routing.module';

import { EstadocitaViewPage } from './estadocita-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadocitaViewPageRoutingModule
  ],
  declarations: [EstadocitaViewPage]
})
export class EstadocitaViewPageModule {}
