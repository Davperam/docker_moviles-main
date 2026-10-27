import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { IonicModule } from '@ionic/angular';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

import { DocumentosclinicosListPageRoutingModule } from './documentosclinicos-list-routing.module';

import { DocumentosclinicosListPage } from './documentosclinicos-list.page';
import { DocumentosclinicosFormPageModule } from '../documentosclinicos-form/documentosclinicos-form.module';

@NgModule({
  imports: [
    CommonModule,
    PaginacionModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    DocumentosclinicosListPageRoutingModule
  ],
  declarations: [DocumentosclinicosListPage]
})
export class DocumentosclinicosListPageModule {}
