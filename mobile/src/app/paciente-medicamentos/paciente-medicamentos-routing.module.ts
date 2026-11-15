import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteMedicamentosPage } from './paciente-medicamentos.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteMedicamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteMedicamentosPageRoutingModule {}
