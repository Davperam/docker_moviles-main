import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteAlergiasPage } from './paciente-alergias.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteAlergiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteAlergiasPageRoutingModule {}
