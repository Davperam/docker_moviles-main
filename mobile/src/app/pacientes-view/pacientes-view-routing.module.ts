import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesViewPage } from './pacientes-view.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesViewPageRoutingModule {}
