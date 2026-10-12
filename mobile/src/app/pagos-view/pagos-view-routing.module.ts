import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosViewPage } from './pagos-view.page';

const routes: Routes = [
  {
    path: '',
    component: PagosViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosViewPageRoutingModule {}
