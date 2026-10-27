import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { IonicModule } from '@ionic/angular';

import { PagosListPageRoutingModule } from './pagos-list-routing.module';

import { PagosListPage } from './pagos-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PaginacionModule,
    PagosListPageRoutingModule
  ],
  declarations: [PagosListPage]
})
export class PagosListPageModule {}
