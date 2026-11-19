import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosViewPageRoutingModule } from './pagos-view-routing.module';

import { PagosViewPage } from './pagos-view.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PagosViewPageRoutingModule
  ],
  declarations: [PagosViewPage]
})
export class PagosViewPageModule {}
