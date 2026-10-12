import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentosViewPage } from './medicamentos-view.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentosViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentosViewPageRoutingModule {}
