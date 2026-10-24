import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosclinicosListPageRoutingModule } from './documentosclinicos-list-routing.module';

import { DocumentosclinicosListPage } from './documentosclinicos-list.page';
import { DocumentosclinicosFormPageModule } from '../documentosclinicos-form/documentosclinicos-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosclinicosListPageRoutingModule
  ],
  declarations: [DocumentosclinicosListPage]
})
export class DocumentosclinicosListPageModule {}
