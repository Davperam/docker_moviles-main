import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedienteclinicoListPage } from './expedienteclinico-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedienteclinicoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedienteclinicoListPageRoutingModule {}
