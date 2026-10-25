import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentosFormPage } from './medicamentos-form.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentosFormPageRoutingModule {}
