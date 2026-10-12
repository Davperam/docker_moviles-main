import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistaespecialidadFormPage } from './dentistaespecialidad-form.page';

const routes: Routes = [
  {
    path: '',
    component: DentistaespecialidadFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistaespecialidadFormPageRoutingModule {}
