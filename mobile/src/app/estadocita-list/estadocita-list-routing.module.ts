import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadocitaListPage } from './estadocita-list.page';

const routes: Routes = [
  {
    path: '',
    component: EstadocitaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadocitaListPageRoutingModule {}
