import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedientemedicamentoListPage } from './expedientemedicamento-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedientemedicamentoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedientemedicamentoListPageRoutingModule {}
