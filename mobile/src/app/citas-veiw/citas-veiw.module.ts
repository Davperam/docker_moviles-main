import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasVeiwPageRoutingModule } from './citas-veiw-routing.module';

import { CitasVeiwPage } from './citas-veiw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasVeiwPageRoutingModule
  ],
  declarations: [CitasVeiwPage]
})
export class CitasVeiwPageModule {}
