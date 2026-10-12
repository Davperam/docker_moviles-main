import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitadetallesViewPageRoutingModule } from './citadetalles-view-routing.module';

import { CitadetallesViewPage } from './citadetalles-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitadetallesViewPageRoutingModule
  ],
  declarations: [CitadetallesViewPage]
})
export class CitadetallesViewPageModule {}
