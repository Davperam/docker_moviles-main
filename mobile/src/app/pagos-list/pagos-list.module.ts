import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosListPageRoutingModule } from './pagos-list-routing.module';

import { PagosListPage } from './pagos-list.page';
import { PagosFormPageModule } from '../pagos-form/pagos-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosListPageRoutingModule
  ],
  declarations: [PagosListPage]
})
export class PagosListPageModule {}
