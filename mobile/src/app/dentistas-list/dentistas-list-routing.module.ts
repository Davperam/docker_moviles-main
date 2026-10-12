import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistasListPage } from './dentistas-list.page';

const routes: Routes = [
  {
    path: '',
    component: DentistasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistasListPageRoutingModule {}
