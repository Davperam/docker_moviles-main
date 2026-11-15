import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteOdontogramasPage } from './paciente-odontogramas.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteOdontogramasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteOdontogramasPageRoutingModule {}
