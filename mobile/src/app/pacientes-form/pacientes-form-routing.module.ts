import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesFormPage } from './pacientes-form.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesFormPageRoutingModule {}
