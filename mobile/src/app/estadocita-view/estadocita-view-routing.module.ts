import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadocitaViewPage } from './estadocita-view.page';

const routes: Routes = [
  {
    path: '',
    component: EstadocitaViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadocitaViewPageRoutingModule {}
