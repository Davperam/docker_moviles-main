import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';

import { IonicModule } from '@ionic/angular';

import { DocumentosclinicosViewPageRoutingModule } from './documentosclinicos-view-routing.module';

import { DocumentosclinicosViewPage } from './documentosclinicos-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DocumentosclinicosViewPageRoutingModule
  ],
  declarations: [DocumentosclinicosViewPage]
})
export class DocumentosclinicosViewPageModule {}
