import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodopagoListPage } from './metodopago-list.page';

const routes: Routes = [
  {
    path: '',
    component: MetodopagoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodopagoListPageRoutingModule {}
