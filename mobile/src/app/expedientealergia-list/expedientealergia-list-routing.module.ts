import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedientealergiaListPage } from './expedientealergia-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedientealergiaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedientealergiaListPageRoutingModule {}
