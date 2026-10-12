import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedientemedicamentoViewPage } from './expedientemedicamento-view.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedientemedicamentoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedientemedicamentoViewPageRoutingModule {}
