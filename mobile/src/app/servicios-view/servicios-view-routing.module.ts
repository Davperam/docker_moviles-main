import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosViewPage } from './servicios-view.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosViewPageRoutingModule {}
