import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteCitasPage } from './paciente-citas.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteCitasPageRoutingModule {}
