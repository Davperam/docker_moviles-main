import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

import { IonicModule } from '@ionic/angular';

import { CitadetallesListPageRoutingModule } from './citadetalles-list-routing.module';

import { CitadetallesListPage } from './citadetalles-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    CitadetallesListPageRoutingModule
  ],
  declarations: [CitadetallesListPage]
})
export class CitadetallesListPageModule {}
