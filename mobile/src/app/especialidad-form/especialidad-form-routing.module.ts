import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadFormPage } from './especialidad-form.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadFormPageRoutingModule {}
