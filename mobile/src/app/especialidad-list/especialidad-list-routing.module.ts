import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadListPage } from './especialidad-list.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadListPageRoutingModule {}
