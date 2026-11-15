import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteExpedientePage } from './paciente-expediente.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteExpedientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteExpedientePageRoutingModule {}
