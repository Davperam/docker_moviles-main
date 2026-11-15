import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteNotaclinicaPage } from './paciente-notaclinica.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteNotaclinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteNotaclinicaPageRoutingModule {}
