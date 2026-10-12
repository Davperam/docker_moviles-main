import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdontogramasListPage } from './odontogramas-list.page';

const routes: Routes = [
  {
    path: '',
    component: OdontogramasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdontogramasListPageRoutingModule {}
