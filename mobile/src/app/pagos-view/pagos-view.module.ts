import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosViewPageRoutingModule } from './pagos-view-routing.module';

import { PagosViewPage } from './pagos-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosViewPageRoutingModule
  ],
  declarations: [PagosViewPage]
})
export class PagosViewPageModule {}
