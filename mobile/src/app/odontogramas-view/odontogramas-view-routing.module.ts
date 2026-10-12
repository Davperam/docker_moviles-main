import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdontogramasViewPage } from './odontogramas-view.page';

const routes: Routes = [
  {
    path: '',
    component: OdontogramasViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdontogramasViewPageRoutingModule {}
