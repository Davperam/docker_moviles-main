import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosListPage } from './servicios-list.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosListPageRoutingModule {}
