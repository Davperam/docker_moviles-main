import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdontogramasFormPage } from './odontogramas-form.page';

const routes: Routes = [
  {
    path: '',
    component: OdontogramasFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdontogramasFormPageRoutingModule {}
