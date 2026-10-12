import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistasFormPage } from './dentistas-form.page';

const routes: Routes = [
  {
    path: '',
    component: DentistasFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistasFormPageRoutingModule {}
