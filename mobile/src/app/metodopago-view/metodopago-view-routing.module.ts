import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodopagoViewPage } from './metodopago-view.page';

const routes: Routes = [
  {
    path: '',
    component: MetodopagoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodopagoViewPageRoutingModule {}
